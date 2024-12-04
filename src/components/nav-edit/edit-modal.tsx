import { FC, useState } from 'react';
import styles from './edit-modal.module.css';

interface EditModalProps {
  onClose: () => void;
  onSave: (newName: string) => void;
  currentName: string;
}

export const EditModal: FC<EditModalProps> = ({
  onClose,
  onSave,
  currentName
}) => {
  const [newName, setNewName] = useState(currentName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleSubmit = () => {
    if (newName.trim()) {
      onSave(newName);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <input
            type='text'
            value={newName}
            onChange={handleChange}
            className={styles.inputField}
          />
          <button className={styles.modalButton} onClick={handleSubmit}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
