import { FC } from 'react';
import styles from './nav-modal.module.css';

interface ModalProps {
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const NavModal: FC<ModalProps> = ({ onClose, onDelete, onEdit }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
      <div className={styles.modalBody}>
        <button className={styles.modalButton} onClick={onEdit}>
          Изменить
        </button>
        <button className={styles.modalButton} onClick={onDelete}>
          Удалить
        </button>
      </div>
    </div>
  </div>
);
