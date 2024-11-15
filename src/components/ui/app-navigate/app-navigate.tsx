import React, { FC } from 'react';
import styles from './app-navigate.module.css';
import { NavigateCard } from '../../navigate-card/navigate-card';
export const AppNavigateUI: FC = () => (
  <nav>
    <div className={styles.navigate}>
      <NavigateCard />
    </div>
  </nav>
);
