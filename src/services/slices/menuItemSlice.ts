import {
  addMenuItemApi,
  changeMenuItemApi,
  delMenuItemApi,
  getMenuItemsApi
} from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TMenuItems } from '@utils-types';
import { stringify } from 'uuid';

export const getMenuItems = createAsyncThunk<TMenuItems[], void>(
  'menuItems/getMenuItems',
  async (): Promise<TMenuItems[]> => await getMenuItemsApi()
);

export const addMenuItems = createAsyncThunk<TMenuItems, TMenuItems>(
  'menuItems/addMenuItems',
  async (data: TMenuItems): Promise<TMenuItems> => await addMenuItemApi(data)
);

export const delMenuItem = createAsyncThunk<TMenuItems, string>(
  'menuItems/delMenuItem',
  async (id: string): Promise<TMenuItems> => await delMenuItemApi(id)
);

export const changeMenuItem = createAsyncThunk<
  TMenuItems,
  { id: string; name: string }
>(
  'menuItems/changeMenuItem',
  async (data: { id: string; name: string }): Promise<TMenuItems> =>
    await changeMenuItemApi(data)
);

type TMenuItemsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TMenuItems[];
};
const initialState: TMenuItemsState = {
  isLoading: true,
  error: null,
  data: []
};

export const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuItems.pending, (state, action) => {
        console.log('654654654');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        console.log(state.data);
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addMenuItems.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(action.payload);
        console.log(JSON.stringify(state.data));
      })
      .addCase(addMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(changeMenuItem.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(JSON.stringify(state.data));
        const foundMenuItem = state.data.find(
          (item) =>
            // console.log(typeof action.payload.id);
            // console.log(typeof item.id);
            action.payload.id === item.id
        );
        if (!foundMenuItem) {
          console.log('not find');
        } else {
          foundMenuItem.name = action.payload.name;
          console.log(foundMenuItem);
        }
      })
      .addCase(changeMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
        console.log(state.error);
      });
  }
});

export const {} = menuItemsSlice.actions;
export default menuItemsSlice.reducer;
