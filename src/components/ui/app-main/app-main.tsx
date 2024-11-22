import React, { FC } from 'react';
import styles from './app-main.module.css';
import { ICardProps } from 'src/components/app-main/app-main';

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

  return (
    <div className={styles.main}>
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
            {/* Карточки с сервера */}
            <div className={styles.main_cards_card}>
              <div className={styles.main_cards_card_img}>
                <img
                  className={styles.main_base_card_img}
                  src={image}
                  alt={`card-${id}`}
                />
              </div>
              <div className={styles.main_base_card_text}>
                <p className={styles.main_base_card_text_p}>{text}</p>
              </div>
            </div>

            {/* Тут вывод  потом сделать...   
            <>
                {data.map((card: ICardProps) => (
                <Card key={card.id} {...card} />
                ))}
            </> */}

            {/* ПРИМЕР отображения карточки с картинкой, потом удалить: */}
            <div className={styles.main_cards_card}>
              <div className={styles.main_cards_card_img}>
                <img
                  className={styles.main_base_card_img}
                  src={require('/public/images/img_test1.png')}
                  alt='example'
                />
              </div>
              <div className={styles.main_base_card_text}>
                <p className={styles.main_base_card_text_p}>Описание.</p>
              </div>

              {/* Стили кнопок, использовать в форме */}
              {/* <div className={styles.main_base_card_buttons}>
                <button className={styles.main_base_card_button_save} onClick={() => {}}>
                  Сохранить
                </button>
                <button className={styles.main_base_card_button} onClick={() => {}}>
                  Удалить
                </button>
              </div> */}
            </div>
            {/* Карточка добавления */}
            {isAuthenticated && (
              <div className={styles.main_cards_add}>
                <div className={styles.main_cards_add_icon} onClick={() => {}}>
                  <span className={styles.main_cards_add_icon_plus}>+</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
