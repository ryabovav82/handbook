import { PasswordInput } from '@zlden/react-developer-burger-ui-components';
import {getUser, register, login, logoutUser, slice, initialState, TUserState} from './userSlice';
import {SerializedError } from '@reduxjs/toolkit';

jest.mock('../../utils/handbook-api', () => ({
	getUserApi: jest.fn(),
	logoutApi: jest.fn(),
	registerUserApi: jest.fn(),
	loginUserApi: jest.fn()
}));

jest.spyOn(console, 'log').mockImplementation(() => {});

const userSliceReducer = slice.reducer;

describe('проверки для userSlice', () => {
    it('проверка getUser', () => {
        const userData = { email: 'tania@ya.ru', name: 'Таня'};
      
        const stateWithData = userSliceReducer(
          initialState,
          getUser.fulfilled(userData, '')
        );
      
        expect(stateWithData.data).toEqual({ email: userData.email, name: userData.name });
        expect(stateWithData.isAuthenticated).toEqual(true);
        expect(stateWithData.isAuthChecked).toEqual(true);
      
        const newstate = userSliceReducer(
          initialState,
          getUser.rejected(new Error('Error message'), '')
        );
      
        expect(newstate.isAuthChecked).toEqual(true);
      });

	it('проверка loginUser', () => {
		const loginData = { email: 'tania@ya.ru', password: '12345' };

		const state = userSliceReducer(
			initialState,
			login.pending('', { email: '', password: '' })
		);
        expect(state.loginError).toBe(undefined);

		const user = { name: 'Таня', email: 'tania@ya.ru' };
		const stateWithData = userSliceReducer(
			initialState,
			login.fulfilled(user, '', loginData)
		);
		expect(stateWithData.data).toEqual(user);
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.loginError).toEqual(undefined);
      //Дописать тест для .addCase(login.rejected, (state, action)

    })
		
	it('проверка logoutUser', () => {

		const testUser = { email: '', name: '' };
		const stateWithData = userSliceReducer(
			initialState,
			logoutUser.fulfilled(undefined, '')
		);
		expect(stateWithData.data).toEqual({ email: testUser.email, name: testUser.name });
		expect(stateWithData.isAuthenticated).toEqual(false);

		const newstate = userSliceReducer(
			initialState,
			logoutUser.rejected(new Error('Error message'), '')
		);
        expect(console.log).toHaveBeenCalledWith('LOGOUT ERROR');
	});

	it('проверка register', () => {
		const registerData = {
			email: 'tania@ya.ru',
            name: 'Таня',
			password: 'password'
		};

		const state = userSliceReducer(
			initialState,
			register.pending('', { email: '', password: '', name: '' })
		);
        expect(state.registerError).toEqual(undefined);

        
		const testUser = {
			success: true,
			refreshToken:
				'8817d3690480aad65ee0f4326729ac194b2dfcadec4851147214eb293ab8cd7a606352bf837f9942',
			accessToken:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWEzMWU1ZDgyOWJlMDAxYzc3ODVmYSIsImlhdCI6MTcyOTc2OTk1NywiZXhwIjoxNzI5NzcxMTU3fQ.iSiv2AshZm0KQstpaQmEn8JrBajRtfr38XJgDuwUJUg',
          
            email: 'tania@ya.ru',
			name: 'Таня'
        
		};
		const stateWithData = userSliceReducer(
			initialState,
			register.fulfilled(testUser, '', registerData)
		);
		expect(stateWithData.data).toEqual({name: testUser.name, email: testUser.email, accessToken: testUser.accessToken, refreshToken: testUser.refreshToken, success: testUser.success });
		expect(stateWithData.isAuthenticated).toEqual(true);
		expect(stateWithData.registerError).toEqual(undefined);

        //Дописать тест для .addCase(register.rejected, (state, action)
	});

});

describe('проверка начального состояния для slice', () => {
	it('проверка на соответствие начальному состоянию', () => {
		expect(initialState).toEqual({
            isAuthChecked: false,
            isAuthenticated: false,
            data: {
                name: '',
                email: ''
              }
		});
	});
});


