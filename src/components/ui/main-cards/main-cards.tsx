import React, { FC, ChangeEvent } from 'react';
import styles from './main-cards.module.css';
import { useState } from 'react';
import { TCard } from '@utils-types';
import { useDispatch } from '../../../services/store';
import { delCard, changeCardText } from '../../../services/slices/cardSlice';

export const MainCardsUI: FC<TCard> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated); Later

  const [editedText, setEditedText] = useState(text);
  const [editedImage, setEditedImage] = useState(image);
  const [isVisible, setIsVisible] = useState(true); // видимость карточки
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(changeCardText({ menuItemId, id, text: editedText }));
  };

  const handleDelete = () => {
    dispatch(delCard({ menuItemId, id }));
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.main_cards_card} key={id}>
          <div className={styles.main_cards_card_img}>
            <img
              className={styles.main_base_card_img}
              src={editedImage}
              alt={`card-${id}`}
            />
            {isAuthenticated && (
              <input
                className={styles.main_base_card_img_input}
                type='file'
                accept='image/*'
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const imageUrl = reader.result as string;
                      setEditedImage(imageUrl);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            )}
          </div>
          <div className={styles.main_base_card_text}>
            {isAuthenticated ? (
              <textarea
                className={styles.main_base_card_text_input}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <p className={styles.main_base_card_text_p}>{editedText}</p>
            )}
          </div>
          {isAuthenticated && (
            <div className={styles.main_base_card_buttons}>
              <button
                className={styles.main_base_card_button_save}
                onClick={handleSave}
              >
                Сохранить
              </button>
              <button
                className={styles.main_base_card_button}
                onClick={handleDelete}
              >
                Удалить
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
