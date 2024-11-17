import { FC } from 'react';
import styles from './app.module.css';
import { AppFooter, AppHeader, AppNavigate } from '@components';
import { AppMain } from '../app-main';
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppFooter />
    <AppNavigate />
    <AppMain />
  </div>
);

export default App;
