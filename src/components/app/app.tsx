import styles from './app.module.css';
import { AppFooter, AppHeader, AppNavigate } from '@components';
import { AppMain } from '../app-main';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppFooter />
    <AppNavigate />
    <AppMain />
  </div>
);

export default App;
