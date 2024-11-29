import { FC } from 'react';
import { HandbookPageUI } from '../../components/ui/pages/handbook-page/handbook-page';

export const HandbookPage: FC = () => (
  <HandbookPageUI
    // isCardsLoading={false}
    isSelected
    isAuthenticated={false}
  />
);

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер
// пока поставила isCardsLoading={false}
