import { FC, useEffect } from 'react';
import styles from './app.module.css';
import { AppFooter, AppHeader, AppNavigate } from '@components';
// import { AppMain } from '../app-main';
import { Route, Routes, useLocation } from 'react-router-dom';
import { HandbookPage, NotFound404, Register } from '@pages';
import { LoginUI } from '@ui-pages';
import { FaqPage } from '../../pages/faq-page';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getUser } from '../../services/slices/userSlice';

const App = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const shouldHideNavigate = ['/faq', '/report-error', '/login'].includes(
    location.pathname
  );

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={!shouldHideNavigate && <HandbookPage />} />

        <Route path='/faq' element={<FaqPage />} />
        <Route path='/report-error' element={<h1>Report Error Page</h1>} />
        <Route path='/login' element={<LoginUI />} />
        <Route path='/register' element={<Register />} />

        {/* <Route path='/card/:id' element={<h1>Card Page</h1>} /> */}

        <Route path='/other-page' element={<h1>Other Page</h1>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      <AppFooter />
    </div>
  );
};

export default App;
