import { FC } from 'react';
import styles from './handbook-page.module.css';
// export const HandbookPageUI: FC = () => <>Handbook page</>;

import { AppNavigate, AppMain } from '@components';
import { Preloader } from '@ui';
import { HandbookPageUIProps } from './type';

// TODO: возможно... реализовать потом на момент загрузки данных прелоадер, учлащая его в HandbookPageUIProps
export const HandbookPageUI: FC<HandbookPageUIProps> = ({ isCardsLoading }) => (
  <main className={styles.containerMain}>
    <div className={styles.main_hp}>
      <AppNavigate />
      {isCardsLoading ? <Preloader /> : <AppMain />}
    </div>
  </main>
);
