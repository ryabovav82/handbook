import { getMenuItemsApi } from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TFaqItems } from '@utils-types';

export const getFaqItems = createAsyncThunk<TFaqItems[], void>(
  'ingredients/getIngredient',
  async (): Promise<TFaqItems[]> => await getMenuItemsApi()
);

type TMenuItemsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TFaqItems[];
};
const initialState: TMenuItemsState = {
  isLoading: true,
  error: null,
  data: []
};

export const faqItemsSlice = createSlice({
  name: 'faqItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFaqItems.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFaqItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getFaqItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = faqItemsSlice.actions;
export default faqItemsSlice.reducer;
