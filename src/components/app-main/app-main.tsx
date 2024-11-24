import { FC } from 'react';
import { AppMainUI } from '../ui/app-main';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getCards } from '../../services/slices/cardSlice';

export interface ICardProps {
  id: number;
  menuItemId: number;
  serialNumber: number;
  image: string;
  text: string;
}
// export const AppMain: FC = () => <AppMainUI />;

export const AppMain: FC = () => {
  // пропсы для примера
  const cardProps: ICardProps = {
    id: 1,
    menuItemId: 10,
    serialNumber: 1000,
    image: 'http://localhost:3001/menuitem/card/images/14.jpg',
    text: 'Инструкция по эксплуатации — описание изделия и правил пользования им. Должностная инструкция — документ, регламентирующий производственные полномочия и обязанности работника. Инструкция по применению лекарственного препарата — официальный документ, содержащий информацию о лекарственном препарате, необходимую и достаточную для его эффективного и безопасного медицинского применения.Инструкция по эксплуатации — описание изделия и правил пользования им. Должностная инструкция — документ, регламентирующий производственные полномочия и обязанности работника. Инструкция по применению лекарственного препарата — официальный документ, содержащий информацию о лекарственном препарате, необходимую и достаточную для его эффективного и безопасного медицинского применения.'
  };

  return <AppMainUI {...cardProps} />;
};
