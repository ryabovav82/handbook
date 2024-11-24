import React, { FC, ChangeEvent } from 'react';
import styles from './app-main.module.css';
import { ICardProps } from 'src/components/app-main/app-main';
import { useState } from 'react';
import { useDispatch, useSelector } from 'src/services/store';
import { rootReducer } from 'src/services/store';

// export const AppMainUI: FC = () => <main>Main</main>;

export const AppMainUI: FC<ICardProps> = ({
  id,
  menuItemId,
  serialNumber,
  image,
  text
}) => {
  const isSelected = true; //при выбранном пункте меню useSelector(state => state.slice.isSelected) В логику потом
  const isAuthenticated = false; //useSelector(state => state.auth.isAuthenticated); В логику потом

  const [editedText, setEditedText] = useState(text);
  const [editedImage, setEditedImage] = useState(image);

  // Открытие пустого компанента для добавления карточки
  const openEmptyCard = (emptyCard: ICardProps) => {
    const newCard: ICardProps = {
      id: Date.now(),
      menuItemId: 1,
      serialNumber: 1,
      image: '',
      text: ''
    };
    setEditedText(newCard.text);
    setEditedImage(newCard.image);

    // TODO:логика открытия пустого компонента для заполнения в ДОБАВЛЕНИЕ к карточкам сервера, написать
  };

  const handleSave = () => {
    // логика сохранения
    console.log('Сохранено');
  };

  const handleDelete = () => {
    // логика удаления
    console.log('Удалено');
  };

  return (
    <div className={styles.main}>
      //{' '}
      {!isSelected && (
        <div className={styles.main_base}>
          {' '}
          <img
            className={styles.main_base_img}
            src={require('/public/images/main_3.png')}
            alt='Create handbook'
          />
        </div>
      )}
      <div>
        {isSelected && (
          <div className={styles.main_cards}>
            <div className={styles.main_cards_card}>
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
          </div>
        )}

        {/* TODO: вывести ВСЕ карточки */}

        {/* Карточка добавления */}
        {isAuthenticated && (
          <div className={styles.main_cards_add}>
            <div
              className={styles.main_cards_add_icon}
              onClick={() => {
                const emptyCard: ICardProps = {
                  id: Date.now(),
                  menuItemId: 1,
                  serialNumber: 1,
                  image: '',
                  text: ''
                };
                openEmptyCard(emptyCard);
              }}
            >
              <span className={styles.main_cards_add_icon_plus}>+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
