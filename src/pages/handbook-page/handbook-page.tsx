import { FC } from 'react';
import { HandbookPageUI } from '../../components/ui/pages/handbook-page/handbook-page';
import { useSelector } from '../../services/store';
import { useState } from 'react';

export const HandbookPage: FC = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );
  const isSelected = useSelector((state) => state.menuItemsReducer.isSelected);

  return (
    <HandbookPageUI
      // isCardsLoading={false}
      isSelected={isSelected}
      isAuthenticated={isAuthenticated}
    />
  );
};

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер
// пока поставила isCardsLoading={false}
