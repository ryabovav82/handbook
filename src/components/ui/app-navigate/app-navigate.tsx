import React, { FC, useState } from 'react';
import styles from './app-navigate.module.css';
import { NavigateCard } from '../../navigate-card/navigate-card';
import { CardProps } from 'src/components/app-navigate/app-navigate';

interface AppNavigateUIProps {
  cards: CardProps[];
}

export const AppNavigateUI: FC<AppNavigateUIProps> = ({ cards }) => {
  const addCard = () => {
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
