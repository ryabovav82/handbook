import {
  addCardApi,
  changeCardTextApi,
  delCardApi,
  getCardsApi
} from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TCard } from '@utils-types';

export const getCards = createAsyncThunk<TCard[], string>(
  'cards/getCards',
  async (menuItemId: string): Promise<TCard[]> => await getCardsApi(menuItemId)
);

export const addCard = createAsyncThunk<TCard, TCard>(
  'cards/addCard',
  async (newCard: TCard): Promise<TCard> => await addCardApi(newCard)
);

export const delCard = createAsyncThunk<
  TCard,
  { menuItemId: string; id: string }
>(
  'cards/delCard',
  async ({
    menuItemId,
    id
  }: {
    menuItemId: string;
    id: string;
  }): Promise<TCard> => await delCardApi(menuItemId, id)
);

export const changeCardText = createAsyncThunk<
  TCard,
  { menuItemId: string; id: string; text: string }
>(
  'cards/changeCard',
  async (data: {
    menuItemId: string;
    id: string;
    text: string;
  }): Promise<TCard> => await changeCardTextApi(data)
);

type TCardsState = {
  isLoading: boolean;
  error: null | SerializedError;
  data: TCard[];
};
const initialState: TCardsState = {
  isLoading: true,
  error: null,
  data: []
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(addCard.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.data = action.payload;
        console.log(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export const {} = cardsSlice.actions;
export default cardsSlice.reducer;
