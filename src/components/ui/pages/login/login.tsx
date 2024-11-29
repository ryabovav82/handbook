import { FC } from 'react';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
export const LoginUI: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Вход</h1>
    <form className={styles.form}>
      <input type='email' placeholder='Эмейл' className={styles.input} />
      <input type='password' placeholder='Пароль' className={styles.input} />
      <button type='submit' className={styles.loginButton}>
        Войти
      </button>
    </form>
    <Link to='/register'>
      <button className={styles.registerButton}>Зарегистрироваться</button>
    </Link>
  </div>
);
