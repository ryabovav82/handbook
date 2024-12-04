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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      // добавления карточки
      .addCase(addMenuItems.fulfilled, (state, action) => {
        state.data = state.data.map((menuItem) => {
          if (menuItem.id === action.payload.id) {
            return {
              ...menuItem,
              cards: [...menuItem.cards, ...action.payload.cards]
            };
          }
          return menuItem;
        });
        state.data.push(action.payload);
      })
      .addCase(delMenuItem.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (menuItem) => menuItem.id !== action.payload.id
        );
      });
  }
});

export const {} = menuItemsSlice.actions;
export default menuItemsSlice.reducer;
