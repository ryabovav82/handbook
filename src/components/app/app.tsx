import { FC } from 'react';
import styles from './app.module.css';
import { AppFooter, AppHeader, AppNavigate } from '@components';
import { AppMain } from '../app-main';
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();

  const shouldHideNavigate = ['/faq', '/report-error', '/login'].includes(
    location.pathname
  );

  return (
    <div className={styles.app}>
      <AppHeader />

      {!shouldHideNavigate && <AppNavigate />}

      <Routes>
        <Route path='/' element={<AppMain />} />

        <Route path='/faq' element={<h1>FAQ Page</h1>} />
        <Route path='/report-error' element={<h1>Report Error Page</h1>} />
        <Route path='/login' element={<h1>Login Page</h1>} />

        <Route path='/card/:id' element={<h1>Card Page</h1>} />

        <Route path='/other-page' element={<h1>Other Page</h1>} />
      </Routes>

      <AppFooter />
    </div>
  );
};

export default App;
