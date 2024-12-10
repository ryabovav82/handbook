import React, { FC, ChangeEvent } from 'react';
import styles from './main-base.module.css';
import { MainNewCard } from '@components';

// export const AppMainUI: FC = () => <main>Main</main>;

export const MainBaseUI: FC = () => (
  <div className={styles.main_base}>
    <img
      className={styles.main_base_img}
      src={require('/public/images/main_4.png')}
      alt='Create handbook'
    />
  </div>
);
