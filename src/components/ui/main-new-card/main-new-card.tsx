import React, { FC, ChangeEvent, useEffect } from 'react';
import styles from './main-new-card.module.css';
import { useState } from 'react';
import {
  addMenuItems,
  changeMenuItem,
  delMenuItem,
  getMenuItems
} from '../../../services/slices/menuItemSlice';
import { TCard } from '@utils-types';
import { addCard, delCard } from '../../../services/slices/cardSlice';
import { useDispatch } from '../../../services/store';

export const MainNewCardUI: FC<TCard> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    getMenuItems();
  }, []);
  const testcard = {
    id: '',
    menuItemId: '',
    serialNumber: '',
    image: '',
    text: 'Напишите инструкцию'
  };

  const [editedText, setEditedText] = useState(testcard.text);
  const [editedImage, setEditedImage] = useState(testcard.image);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleCreateNewCard = () => {
    setIsOpen(true);
  };
  const handleSave = () => {
    const newCard: TCard = {
      id: id,
      menuItemId: 1, //Заглушка
      serialNumber: 1, //Заглушка
      image: editedImage,
      text: editedText
    };

    dispatch(addCard(newCard));
    window.location.reload(); //пока  поставила перезагрузку, но надо сделать так , чтобы без перезагрузки новое состояние наступало, пока не получается
  };

  const handleDelete = () => {
    dispatch(delCard({ menuItemId, id }))
      .then(() => {
        setIsOpen(false); // Закрываем форму редактирования
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  };
  // Загрузка изображений на сервер пока не работает
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setEditedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {isOpen ? (
        <div
          className={styles.main_cards_card}
          key={id}
          onClick={handleCreateNewCard}
        >
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
                onChange={handleChangeImage}
              />
            )}
          </div>
          <div className={styles.main_base_card_text}>
            {isAuthenticated ? (
              <textarea
                className={styles.main_base_card_text_input}
                value={editedText}
                onChange={(e) => {
                  setEditedText(e.target.value);
                }}
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
      ) : null}

      {/* Отобразим кнопку добавления новой карточки */}
      {!isOpen && (
        <div className={styles.main_cards_add}>
          <div
            className={styles.main_cards_add_icon}
            onClick={handleCreateNewCard}
          >
            <span className={styles.main_cards_add_icon_plus}>+</span>
          </div>
        </div>
      )}
    </div>
  );
};
