import { FC, memo } from 'react';
import { Link } from 'react-router-dom'; // Подключение Link
import styles from './navigate-card.module.css'; // Подключение стилей

interface CardProps {
  content: string; // Пропс для строки
  to: string; // Путь для перехода
}

export const NavigateCardUI: FC<CardProps> = memo(({ content, to }) => (
  <Link to={to} className={styles.cardLink}>
    <div className={styles.card}>
      <p className={styles.content}>{content}</p>
    </div>
  </Link>
));
