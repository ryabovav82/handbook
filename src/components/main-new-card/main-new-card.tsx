import { FC } from 'react';
import { MainNewCardUI } from '../ui/main-new-card';
import { TCard } from '@utils-types';

export const MainNewCard: FC = () => {
  // пропсы для примера
  const cardProps: TCard = {
    id: 1,
    menuItemId: 10,
    serialNumber: 1000,
    image: 'http://localhost:3001/menuitem/card/images/14.jpg',
    text: 'text'
  };
  return <MainNewCardUI {...cardProps} />;
};
