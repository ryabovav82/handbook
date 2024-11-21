import React, { FC } from 'react';
import styles from './app-main.module.css';
// export const AppMainUI: FC = () => <main>Main</main>;

export const AppMainUI: FC = () => {
  const isSelected = false; //при выбранном пункте меню useSelector(state => state.slice.isSelected) В логику потом
  const isAuthenticated = true; //useSelector(state => state.auth.isAuthenticated); В логику потом

  return (
    <div className={styles.main}>
      {!isSelected && 
       <div className={styles.main_base}> <img className={styles.main_base_img} src= {require('/public/images/main_3.png')} alt='Create handbook' /></div>
      }
      <div className={styles.main_cards}>
        {isSelected && <div>Карточка с сервера</div>}
        {isSelected && isAuthenticated && <div>Добавить карточку</div>}
      </div>
    </div>
  );
};
