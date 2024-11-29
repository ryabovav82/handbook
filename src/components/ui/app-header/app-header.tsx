import React, { FC } from 'react';
import styles from './app-header.module.css';
// export const AppHeaderUI: FC = () => <header>Header</header>;

import { TAppHeaderUIProps } from './type';
import { Link } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <div className={styles.header_content}>
      <Link to='/' className={styles.link_logo}>
        {' '}
        <div className={styles.logo}>
          <img
            className={styles.logo_img}
            src={require('/public/images/logo.png')}
            alt='logo'
          />
        </div>
      </Link>
      <form action='' method='get' className={styles.form}>
        <input
          name='search'
          placeholder='Поиск по сайту...'
          type='search'
          className={styles.input}
        />
        <button type='submit' className={styles.button}>
          Поиск
        </button>
      </form>
      <nav className={`${styles.menu}`}>
        {/* TODO: прописать пути */}
        <Link to='/' className={styles.link}>
          <p>Главная</p>
        </Link>
        <Link to='/' className={styles.link}>
          <p>FAQ</p>
        </Link>
        {/* TODO: проверить после реализации авторизации */}
        <Link to='/login' className={styles.link}>
          <p> {userName}</p>
        </Link>
      </nav>
    </div>
  </header>
);
