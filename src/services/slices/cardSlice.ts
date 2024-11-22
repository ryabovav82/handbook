import { getCardsApi, getMenuItemsApi } from '../../utils/handbook-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TCard } from '@utils-types';
import React from 'react';

export const getCards = createAsyncThunk<TCard[], string>(
  'cards/getCards',
  async (id: string): Promise<TCard[]> => await getCardsApi(id)
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
      });
  }
});

export const {} = cardsSlice.actions;
export default cardsSlice.reducer;
