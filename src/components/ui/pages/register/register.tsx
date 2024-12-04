import { FC, SyntheticEvent, useState } from 'react';
import styles from './register.module.css';
import { AppDispatch } from '../../../../services/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../../services/slices/userSlice';

export const RegisterUI: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ name: userName, email, password }));
      navigate('/', { replace: true });
    } catch (_) {}
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Регистрация</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Имя'
          className={styles.input}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type='email'
          placeholder='Эмейл'
          className={styles.input}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='Пароль'
          className={styles.input}
          onChange={(event) => setPassword(event.target.value)}
        />
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
};
