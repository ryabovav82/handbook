import React, { FC } from 'react';
import styles from './app-footer.module.css';
import { Link } from 'react-router-dom';
export const AppFooterUI: FC = () => (
  <footer className={styles.footer}>
    <div className={styles.footer_content}>
      <Link to='tel:+99995555555' className={styles.phone}>
        {' '}
        Тел. +7 (999) 999-99-99
      </Link>
      <div className={styles.footer_content_copyright}>
        <div className={styles.copyright}>
          <span className={styles.copyright_c}>C</span>
        </div>
        <span className={styles.year}>2024 Все права защищены</span>
      </div>
    </div>
  </footer>
);
