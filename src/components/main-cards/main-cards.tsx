import { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCards } from '../../services/slices/cardSlice';
import { TCard } from '@utils-types';
import { MainCardsUI } from '../ui/main-cards';
import { AppDispatch, RootState } from '../../services/store';

interface MainCardsProps {
  cardId: string | null;
}

export const MainCards: FC<MainCardsProps> = ({ cardId }) => {
  const dispatch: AppDispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.cardReducer
  );
  const selectedMenuItem = useSelector(
    (state: RootState) => state.menuItemsReducer.isSelected
  );

  useEffect(() => {
    if (selectedMenuItem) {
      dispatch(getCards(selectedMenuItem.id));
      console.log(`Загрузка карточек для меню с ID ${selectedMenuItem.id}`);
    }
  }, [dispatch, selectedMenuItem]);

  if (isLoading) {
    return <div color='white'>Загружается...</div>;
  }

  if (error) {
    return <div color='white'>Ошибка!</div>;
  }

  return (
    <>
      {data.length > 0 ? (
        data.map((card: TCard) => <MainCardsUI key={card.id} {...card} />)
      ) : (
        <div> </div>
      )}
    </>
  );
};
