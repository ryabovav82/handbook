import React, { FC } from 'react';
import styles from './app-footer.module.css';
export const AppFooterUI: FC = () => 
<footer className={styles.footer}>
    <div className={styles.footer_content}>
        <div className={styles.copyright}><span className={styles.copyright_c}>C</span></div>
        <p className={styles.year}>2024 We</p>
    </div>
</footer>;

// TODO: подумать, что будем писать рядом со значком копирайта, подправить при необходимости
