import { FC } from 'react';
import { MainCardsUI } from '../ui/main-cards';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getCards } from '../../services/slices/cardSlice';
import { TCard } from '@utils-types';
import { AppNavigate } from '../../components/app-navigate';

interface MainCardsProps {
  cardId: string | null;
}

export const MainCards: FC<MainCardsProps> = ({ cardId }) => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.cardReducer);

  // const [selectedMenuItemId, setSelectedMenuItemId] = useState(1);
  // useEffect(() => {
  //   dispatch(getCards(selectedMenuItemId.toString()));
  // }, [dispatch, selectedMenuItemId]);

  // Пока заглушку поставила
  useEffect(() => {
    dispatch(getCards(1));
  }, [dispatch]);

  if (isLoading) {
    return <> Загружается </>;
  }

  if (error) {
    return <>Error: Ошибка загрузки!</>;
  }

  return (
    <>
      {data.map((card) => (
        <MainCardsUI key={card.id} {...card} />
      ))}
    </>
  );
};
