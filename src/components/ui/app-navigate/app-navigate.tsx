import React, { FC } from 'react';
import styles from './app-navigate.module.css';
import { NavigateCard } from '../../navigate-card/navigate-card';
import { CardProps } from 'src/components/app-navigate/app-navigate';
import { useSelector } from '../../../services/store';
import { RootState } from '../../../services/store';

interface AppNavigateUIProps {
  cards: CardProps[];
  onAddCard?: () => void;
  onDeleteCard: (id: string) => void;
  onSelectCard?: (id: string) => void;
}

export const AppNavigateUI: FC<AppNavigateUIProps> = ({
  cards,
  onAddCard,
  onDeleteCard,
  onSelectCard
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.userReducer.isAuthenticated
  );

  return (
    <nav className={styles.navigate}>
      <div className={styles.cardList}>
        {cards.map((card) => (
          <NavigateCard
            key={card._id}
            id={card._id}
            to={card.to}
            content={card.content}
            onDelete={() => onDeleteCard(card._id.toString())}
            onSelect={() => onSelectCard?.(card._id.toString())}
          />
        ))}
      </div>
      {isAuthenticated ? (
        <div className={styles.addCard} onClick={onAddCard}>
          <span className={styles.addCardIcon}>+</span>
        </div>
      ) : null}
    </nav>
  );
};
