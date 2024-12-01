import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigate-card.module.css';

interface CardProps {
  content: string;
  to: string;
  onDelete: () => void;
}

export const NavigateCardUI: FC<CardProps> = memo(
  ({ content, to, onDelete }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    const handleDelete = () => {
      onDelete();
      setMenuOpen(false);
    };

    const handleEdit = () => {
      console.log('Редактировать');
      setMenuOpen(false);
    };

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
              <button className={styles.dropdownItem} onClick={handleEdit}>
                Изменить
              </button>
              <button className={styles.dropdownItem} onClick={handleDelete}>
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);
