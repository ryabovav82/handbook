import React, { FC, ChangeEvent, useEffect } from 'react';
import styles from './main-new-card.module.css';
import { useState } from 'react';
import {
  addMenuItems,
  changeMenuItem,
  delMenuItem,
  getMenuItems
} from '../../../services/slices/menuItemSlice';
import { TCard } from '@utils-types';
import { addCard, delCard } from '../../../services/slices/cardSlice';
import { AppDispatch, useDispatch } from '../../../services/store';
import App from '../../app/app';

export const MainNewCardUI: FC<TCard> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated);

  const dispatch: AppDispatch = useDispatch();

  const handleCreateNewCard = () => {
    const newCard: TCard = {
      id: id,
      menuItemId: 1,
      serialNumber: 1,
      image: 'http://localhost:3001/menuitem/card/images/1.jpg',
      text: 'Введите текст'
    };
    dispatch(addCard(newCard));
  };

  return (
    <div>
      {isAuthenticated && (
        <div className={styles.main_cards_add}>
          <div
            className={styles.main_cards_add_icon}
            onClick={handleCreateNewCard}
          >
            <span className={styles.main_cards_add_icon_plus}>+</span>
          </div>
        </div>
      )}
      {/* Отобразим кнопку добавления новой карточки */}
    </div>
  );
};
