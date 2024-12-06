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
import { AppDispatch, RootState, useDispatch } from '../../../services/store';
import App from '../../app/app';
import { useSelector } from '../../../services/store';

export const MainNewCardUI: FC<TCard> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = useSelector(
    (state) => state.userReducer.isAuthenticated
  );

  const selectedMenuItem = useSelector(
    (state) => state.menuItemsReducer.isSelected
  );

  const dispatch: AppDispatch = useDispatch();

  const handleCreateNewCard = () => {
    const defoltMenuItemID: number = 0;
    const menuItemID = selectedMenuItem
      ? selectedMenuItem.id
      : defoltMenuItemID;
    const newCard: TCard = {
      id: id,
      menuItemId: menuItemID,
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
    </div>
  );
};
