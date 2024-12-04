import { FC } from 'react';
import { HandbookPageUI } from '../../components/ui/pages/handbook-page/handbook-page';
import { useSelector } from '../../services/store';

export const HandbookPage: FC = () => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  return (
    <HandbookPageUI
      // isCardsLoading={false}
      isSelected
      isAuthenticated={isAuthenticated}
    />
  );
};

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер
// пока поставила isCardsLoading={false}
