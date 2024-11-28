import React, { FC, ChangeEvent, useEffect } from 'react';
import styles from './main-new-card.module.css';
import { ICardProps, MainCards } from 'src/components/main-cards/main-cards';
import { useState } from 'react';
import { AppDispatch, useDispatch } from '../../../services/store';
import {
  addMenuItems,
  changeMenuItem,
  delMenuItem,
  getMenuItems
} from '../../../services/slices/menuItemSlice';
import { TCard, TMenuItems } from '@utils-types';

export const MainNewCardUI: FC<ICardProps> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    getMenuItems();
  }, []);
  const testcard = {
    id: '',
    menuItemId: '',
    serialNumber: '',
    image: 'image',
    text: 'sometext'
  };

  const [editedText, setEditedText] = useState(testcard.text);
  const [editedImage, setEditedImage] = useState(testcard.image);

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateNewCard = () => {
    setIsOpen(true);
  };
  //----------------------------------------------------------------------------------------------------------------------------------
  const handleAddIconClick = () => {
    const data: TMenuItems = {
      id: 77,
      name: 'string',
      cards: []
    };
    // setIsOpen(true);
    // dispatch(changeMenuItem({ id: '1', name: 'new name' }));
    dispatch(addMenuItems(data));
  };

  const handleSave = () => {
    // Логика сохранения
    setIsOpen(false);
  };

  const handleDelete = () => {
    // Логика удаления
    setIsOpen(false);
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
                Save
              </button>
              <button
                className={styles.main_base_card_button}
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.main_cards_add}>
          <div
            className={styles.main_cards_add_icon}
            onClick={handleAddIconClick}
          >
            <span className={styles.main_cards_add_icon_plus}>+</span>
          </div>
        </div>
      )}
    </div>
  );
};
