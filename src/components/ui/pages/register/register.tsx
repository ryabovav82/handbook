import { FC } from 'react';
import styles from './register.module.css';

export const RegisterUI: FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Регистрация</h1>
    <form className={styles.form}>
      <input type='text' placeholder='Имя' className={styles.input} />
      <input type='email' placeholder='Эмейл' className={styles.input} />
      <input type='password' placeholder='Пароль' className={styles.input} />
      <button type='submit' className={styles.registerButton}>
        Зарегистрироваться
      </button>
    </form>
    <div className={styles.loginPrompt}>
      <span>Уже зарегистрированы?</span>
      <button className={styles.loginButton}>Войти</button>
    </div>
  </div>
);
