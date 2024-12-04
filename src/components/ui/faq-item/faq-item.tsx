import React, { FC, ChangeEvent, SyntheticEvent, useState } from 'react';
import styles from './faq-item.module.css';
import { AppDispatch } from '../../../services/store';
import { useDispatch } from 'react-redux';
import { TFaqProps } from '../../faq-item/type';

export const FaqItemUI: FC<TFaqProps> = ({
  id,
  title,
  text,
  isAuthenticated,
  handleDelete,
  handleSave
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [titleState, setTitleState] = useState(title);
  const [textState, setTextState] = useState(text);

  return (
    <div key={id} className={styles.faq_item}>
      {isAuthenticated ? (
        <input
          className={styles.faq_item_title}
          type='text'
          value={titleState}
          onChange={(event) => setTitleState(event.target.value)}
        />
      ) : (
        <h2 className={styles.faq_item_title_p}>{titleState}</h2>
      )}
      {isAuthenticated ? (
        <textarea
          className={styles.faq_item_text}
          value={textState}
          onChange={(event) => setTextState(event.target.value)}
        />
      ) : (
        <p className={styles.faq_item_text_p}>{textState}</p>
      )}
      {isAuthenticated ? (
        <div className={styles.faq_item_buttons}>
          <button
            className={styles.faq_item_button_save}
            onClick={() => handleSave(id, titleState, textState)}
          >
            Сохранить
          </button>
          <button
            className={styles.faq_item_button_delete}
            onClick={() => handleDelete(id)}
          >
            Удалить
          </button>
        </div>
      ) : null}
    </div>
  );
};
