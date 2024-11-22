import { getMenuItemsApi } from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TMenuItems } from '@utils-types';

export const getMenuItems = createAsyncThunk<TMenuItems[], void>(
  'menuItems/getMenuItems',
  async (): Promise<TMenuItems[]> => await getMenuItemsApi()
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
        console.log('etMenuItems - pending');
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        console.log('getMenuItems - fulfilled');
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        console.log('getMenuItems - error');
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = menuItemsSlice.actions;
export default menuItemsSlice.reducer;
