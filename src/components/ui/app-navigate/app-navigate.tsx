import React, { FC } from 'react';
import styles from './app-navigate.module.css';
import { NavigateCard } from '../../navigate-card/navigate-card';
import { CardProps } from 'src/components/app-navigate/app-navigate';

interface AppNavigateUIProps {
  cards: CardProps[];
  onAddCard?: () => void;
  onDeleteCard: (id: string) => void; // Пропс для удаления карточки
}

export const AppNavigateUI: FC<AppNavigateUIProps> = ({
  cards,
  onAddCard,
  onDeleteCard
}) => (
  <nav className={styles.navigate}>
    <div className='cardList'>
      {cards.map((card) => (
        <NavigateCard
          key={card._id}
          to={card.to}
          content={card.content}
          onDelete={() => onDeleteCard(card._id)} // Привязка удаления
        />
      ))}
    </div>
    <div className={styles.addCard} onClick={onAddCard}>
      <span className={styles.addCardIcon}>+</span>
    </div>
  </nav>
);
