import {
  addMenuItemApi,
  changeMenuItemApi,
  delMenuItemApi,
  getMenuItemsApi
} from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TCard, TMenuItems } from '@utils-types';
import { stringify } from 'uuid';

export const getMenuItems = createAsyncThunk<TMenuItems[], void>(
  'menuItems/getMenuItems',
  async (): Promise<TMenuItems[]> => await getMenuItemsApi()
);

export const addMenuItems = createAsyncThunk<TMenuItems, TMenuItems>(
  'menuItems/addMenuItems',
  async (data: TMenuItems): Promise<TMenuItems> => await addMenuItemApi(data)
);

export const delMenuItem = createAsyncThunk<string, string>(
  'menuItems/delMenuItem',
  async (id: string): Promise<string> => {
    await delMenuItemApi(id);
    return id;
  }
);

export const changeMenuItem = createAsyncThunk<
  TMenuItems,
  { id: string; name: string }
>(
  'menuItems/changeMenuItem',
  async (data: { id: string; name: string }): Promise<TMenuItems> =>
    await changeMenuItemApi(data)
);

export type TMenuItemsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TMenuItems[];
  isSelected: TMenuItems | null;
};
export const initialState: TMenuItemsState = {
  isLoading: true,
  error: null,
  data: [],
  isSelected: null
};

export const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
    setSelectedMenuItem: (state, action: PayloadAction<TMenuItems | null>) => {
      console.log('Обновление выбранного пункта меню:', action.payload);
      state.isSelected = action.payload;
    }
  },
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
          (menuItem) => menuItem.id !== Number(action.payload)
        );
      })
      .addCase(changeMenuItem.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changeMenuItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const foundMenuItem = state.data.find(
          (item) => item.id === action.payload.id
        );
        if (foundMenuItem) foundMenuItem.name = action.payload.name;
      })
      .addCase(changeMenuItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const { setSelectedMenuItem } = menuItemsSlice.actions;
export default menuItemsSlice.reducer;
