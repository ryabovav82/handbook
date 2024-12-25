import { FC, memo, useState } from 'react';
import { NavModal } from '../../nav-modal/nav-modal';
import { useDispatch } from 'react-redux';
import styles from './navigate-card.module.css';
import { changeMenuItem } from '../../../services/slices/menuItemSlice';
import { EditModal } from '../../nav-edit/edit-modal';
import { AppDispatch } from '../../../services/store';
import { useSelector } from '../../../services/store';
import { RootState } from '../../../services/store';

interface CardProps {
  id: number;
  content: string;
  to: string;
  onDelete: () => void;
  onSelect?: (id: string) => void;
  isSelected: boolean;
}

export const NavigateCardUI: FC<CardProps> = memo(
  ({ id, content, to, onDelete, onSelect, isSelected }) => {
    const isAuthenticated = useSelector(
      (state: RootState) => state.userReducer.isAuthenticated
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
      onDelete();
      setIsModalOpen(false);
    };

    const handleEdit = () => {
      setIsEditModalOpen(true);
      setIsModalOpen(false);
    };

    const handleSaveEdit = (newName: string) => {
      dispatch(changeMenuItem({ id: id.toString(), name: newName }));
    };

    const handleClick = () => {
      if (onSelect) {
        onSelect(id.toString());
      }
    };

    return (
      <div
        className={`${styles.cardWrapper} ${isSelected ? styles.selected : ''}`}
      >
        <div
          className={styles.cardLink}
          onClick={() => onSelect?.(id.toString())}
        >
          <div className={`${styles.card} ${isSelected ? styles.active : ''}`}>
            <p className={styles.content}>{content}</p>
          </div>
        </div>
        {isAuthenticated ? (
          <div className={styles.menuWrapper}>
            <button
              className={styles.menuButton}
              onClick={() => setIsModalOpen(true)}
            >
              ⋮
            </button>
          </div>
        ) : null}

        {isModalOpen && (
          <NavModal
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}

        {isEditModalOpen && (
          <EditModal
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
            currentName={content}
          />
        )}
      </div>
    );
  }
);
