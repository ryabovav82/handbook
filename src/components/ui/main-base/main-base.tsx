import React, { FC, ChangeEvent } from 'react';
import styles from './main-base.module.css';


// export const AppMainUI: FC = () => <main>Main</main>;

export const MainBaseUI: FC = () => {

  return (
    <div className={styles.main}>
        <div className={styles.main_base}>
          <img
            className={styles.main_base_img}
            src={require('/public/images/main_3.png')}
            alt='Create handbook'
          />
        </div>
        </div>
 )
};
