import { FC, useState } from 'react';
import styles from './handbook-page.module.css';
// export const HandbookPageUI: FC = () => <>Handbook page</>;

import { AppNavigate, MainBase, MainCards, MainNewCard } from '@components';
import { Preloader } from '@ui';
import { HandbookPageUIProps } from './type';
import { container } from 'webpack';

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер, учлащая его в HandbookPageUIProps
export const HandbookPageUI: FC<HandbookPageUIProps> = ({
  isSelected,
  // isCardsLoading,
  isAuthenticated
}) => {
  isAuthenticated;
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const handleCardSelect = (id: string) => {
    setSelectedCardId(id);
  };
  return (
    <main className={styles.containerMain}>
      <div className={styles.main_hp}>
        <div className={styles.navigate_scroll}>
          <AppNavigate onCardSelect={handleCardSelect} />
        </div>
        <div className={styles.main}>
          {!isSelected && <MainBase />}
          <div className={styles.main_cards}>
            {isSelected && <MainCards cardId={selectedCardId} />}
            {isSelected && isAuthenticated && <MainNewCard />}
            {/* {isCardsLoading ? <Preloader /> : } */}
          </div>
        </div>
      </div>
    </main>
  );
};
