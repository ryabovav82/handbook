import React, { FC, useState } from 'react';
import styles from './app-navigate.module.css';
import { NavigateCard } from '../../navigate-card/navigate-card';
import { CardProps } from 'src/components/app-navigate/app-navigate';
import { useDispatch } from 'react-redux';
import {
  addMenuItems,
  changeMenuItem,
  delMenuItem
} from '../../../services/slices/menuItemSlice';
import { AppDispatch } from '../../../services/store';

interface AppNavigateUIProps {
  cards: CardProps[];
}

// const data = { id: 5, name: 'some name', cards: [] };
const data = { id: '1732367475479', name: 'Andrey' };

export const AppNavigateUI: FC<AppNavigateUIProps> = ({ cards }) => {
  const dispatch: AppDispatch = useDispatch();
  // const addCard = () => {
  //   dispatch(delMenuItem('1732367469157'));
  //   const newCard = `Card ${cards.length + 1}`;
  // };

  // const addCard = () => {
  //   dispatch(addMenuItems(data));
  //   const newCard = `Card ${cards.length + 1}`;
  // };

  const addCard = () => {
    dispatch(changeMenuItem(data));
    const newCard = `Card ${cards.length + 1}`;
  };

  return (
    <nav>
      <div className={styles.navigate}>
        {cards.map((card) => (
          <NavigateCard key={card._id} to={card.to} content={card.content} />
        ))}
        <div className={styles.addCard} onClick={addCard}>
          <span className={styles.addCardIcon}>+</span>
        </div>
      </div>
    </nav>
  );
};
