import styles from './app.module.css';
import { AppFooter, AppHeader } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppFooter />
  </div>
);

export default App;
