import { FC } from 'react';
import styles from './not-found-404.module.css';

export const NotFound404: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Страница не найдена</h1>
    <p className={styles.errorCode}>Ошибка 404</p>
    <p className={styles.message}>
      К сожалению, запрашиваемая страница не существует.
    </p>
  </div>
);
