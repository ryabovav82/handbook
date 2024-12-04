import { FC, SyntheticEvent, useState } from 'react';
import styles from './login.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { login, logoutUser } from '../../../../services/slices/userSlice';
import { RootState } from '../../../../services/store';
export const LoginUI: FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };

  const { loginError } = useSelector((state: RootState) => state.userReducer);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      navigate(from.pathname, { replace: true });
    } catch (_) {}
  };
  const handleExit = async () => {
    try {
      await dispatch(logoutUser());
      navigate(from.pathname, { replace: true });
    } catch (_) {}
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Эмейл'
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Пароль'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className={styles.loginButton}>
          Войти
        </button>
        <button
          type='button'
          className={styles.loginButton}
          onClick={handleExit}
        >
          Exit
        </button>
      </form>
      <Link to='/register'>
        <button className={styles.registerButton}>Зарегистрироваться</button>
      </Link>
    </div>
  );
};
