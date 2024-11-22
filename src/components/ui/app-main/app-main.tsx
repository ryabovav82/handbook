import React, { FC } from 'react';
import styles from './app-main.module.css';
// export const AppMainUI: FC = () => <main>Main</main>;

export const AppMainUI: FC = () => {
  const isSelected = true; //при выбранном пункте меню useSelector(state => state.slice.isSelected) В логику потом
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated); В логику потом

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
              <img
                  className={styles.main_base_card_img}
                  src={require('/public/images/img_test1.png')}
                  alt='example'
             />
              <div className={styles.main_base_card_text}>Текст-описание</div>
              <div className={styles.main_base_card_buttons}>
                <button className={styles.main_base_card_button}>Сохранить</button>
                <button className={styles.main_base_card_button}>Удалить</button>
              </div>
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
