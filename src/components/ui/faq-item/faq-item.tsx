import React, { FC, ChangeEvent, SyntheticEvent, useState } from 'react';
import styles from './faq-item.module.css';
import { AppDispatch } from '../../../services/store';
import { useDispatch } from 'react-redux';
import { TFaqProps } from '../../faq-item/type';

export const FaqItemUI: FC<TFaqProps> = ({
  id,
  title,
  text,
  handleDelete,
  handleSave
}) => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = true;
  const [titleState, setTitleState] = useState(title);
  const [textState, setTextState] = useState(text);

  return (
    <div key={id} className={styles.faq_item}>
      <input
        type='text'
        value={titleState}
        onChange={(event) => setTitleState(event.target.value)}
      />
      <br />
      <input
        type='textarea'
        value={textState}
        onChange={(event) => setTextState(event.target.value)}
      />
      <br />
      <button onClick={() => handleDelete(id)}>delete</button>
      <button onClick={() => handleSave(id, titleState, textState)}>
        save
      </button>
    </div>
  );
};
