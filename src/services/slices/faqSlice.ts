import {
  addFaqItemApi,
  changeFaqItemApi,
  delFaqItemApi,
  getFaqItemsApi
} from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TFaqItems } from '@utils-types';

export const getFaqItems = createAsyncThunk<TFaqItems[], void>(
  'faqItems/getFaqItems',
  async (): Promise<TFaqItems[]> => await getFaqItemsApi()
);

export const addFaqItem = createAsyncThunk<TFaqItems, TFaqItems>(
  'faqItems/addFaqItem',
  async (data: TFaqItems): Promise<TFaqItems> => await addFaqItemApi(data)
);

export const delFaqItem = createAsyncThunk<TFaqItems, string>(
  'faqItems/delFaqItem',
  async (id: string): Promise<TFaqItems> => await delFaqItemApi(id)
);

export const changeFaqItem = createAsyncThunk<
  TFaqItems,
  { id: string; name: string }
>(
  'faqItems/changeFaqItem',
  async (data: { id: string; name: string }): Promise<TFaqItems> =>
    await changeFaqItemApi(data)
);

type TFaqItemsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TFaqItems[];
};
const initialState: TFaqItemsState = {
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
