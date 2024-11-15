import styles from './app.module.css';
import { AppFooter, AppHeader, AppNavigate } from '@components';
import { AppMain } from '../app-main';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <AppNavigate />

    <Routes>
      <Route path='/' element={<AppMain />} />

      <Route
        path='/faq'
        // element={<FAQPage />}
      />

      <Route
        path='/report-error'
        // element={<ReportErrorPage />}
      />

      <Route
        path='/login'
        // element={<LoginPage />}
      />

      <Route path='/other-page' element={<h1>test!</h1>} />
    </Routes>
    <AppFooter />
  </div>
);

export default App;
