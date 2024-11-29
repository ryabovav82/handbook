import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom'; // Подключение Link
import styles from './navigate-card.module.css'; // Подключение стилей

interface CardProps {
  content: string; // Пропс для строки
  to: string; // Путь для перехода
}

export const NavigateCardUI: FC<CardProps> = memo(({ content, to }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <div className={styles.cardWrapper}>
      <Link to={to} className={styles.cardLink}>
        <div className={styles.card}>
          <p className={styles.content}>{content}</p>
        </div>
      </Link>
      <div className={styles.menuWrapper}>
        <button className={styles.menuButton} onClick={toggleMenu}>
          ⋮
        </button>
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <button className={styles.dropdownItem}>Изменить</button>
            <button className={styles.dropdownItem}>Удалить</button>
          </div>
        )}
      </div>
    </div>
  );
});
