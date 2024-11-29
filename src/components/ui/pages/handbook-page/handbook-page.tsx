import { FC } from 'react';
import styles from './handbook-page.module.css';
// export const HandbookPageUI: FC = () => <>Handbook page</>;

import { AppNavigate, MainBase, MainCards, MainNewCard } from '@components';
import { Preloader } from '@ui';
import { HandbookPageUIProps } from './type';

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер, учлащая его в HandbookPageUIProps
export const HandbookPageUI: FC<HandbookPageUIProps> = ({
  isSelected,
  // isCardsLoading,
  isAuthenticated
}) => (
  <main className={styles.containerMain}>
    <div className={styles.main_hp}>
      <AppNavigate />
      <div className={styles.main}>
        {!isSelected && <MainBase />}
        <div className={styles.main_cards}>
          {isSelected && <MainCards />}
          {isSelected && isAuthenticated && <MainNewCard />}
          {/* {isCardsLoading ? <Preloader /> : } */}
        </div>
      </div>
    </div>
  </main>
);
