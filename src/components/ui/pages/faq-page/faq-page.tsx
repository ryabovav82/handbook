import { FC, SyntheticEvent, useEffect, useState } from 'react';
import styles from './faq-page.module.css';
// export const HandbookPageUI: FC = () => <>Handbook page</>;

import { AppNavigate, MainBase, MainCards, MainNewCard } from '@components';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../services/store';
import {
  addFaqItem,
  changeFaqItem,
  delFaqItem,
  getFaqItems,
  searchFaqItem
} from '../../../../services/slices/faqSlice';
import { TFaqItems } from '@utils-types';
import { FaqItem } from '../../../faq-item';

interface FAQPageProps {
  isAuthenticated: boolean;
}
export const FaqPageUI: FC<FAQPageProps> = ({ isAuthenticated }) => {
  console.log('isAuthenticated -' + isAuthenticated);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(searchFaqItem(''));
  }, [dispatch]);
  const [searchFaq, setSearchFaq] = useState('');
  const faqState = useSelector((state: RootState) => state.faqsReducer);
  const handleDelete = (id: number) => {
    dispatch(delFaqItem(id));
  };
  const handleSave = (id: number, title: string, text: string) => {
    dispatch(changeFaqItem({ id: id, title: title, text: text }));
    console.log('save ID ' + id);
  };
  const handleChange = (value: string) => {
    setSearchFaq(value);
    dispatch(searchFaqItem(value));
  };
  const faqItems = faqState.data.map((item: TFaqItems) => (
    <FaqItem
      key={item.id}
      id={item.id}
      title={item.title}
      text={item.text}
      handleDelete={handleDelete}
      handleSave={handleSave}
      isAuthenticated={isAuthenticated}
    />
  ));

  function handleAddFaq() {
    const data = {
      id: 1,
      title: 'some title',
      text: 'some text'
    };
    dispatch(addFaqItem(data));
  }

  return (
    <main className={styles.containerMain}>
      <div className={styles.container}>
        <h1 className={styles.faqTitle}>FAQ page</h1>
        <input
          className={styles.faqSearch}
          type='text'
          placeholder='Поиск по faq'
          value={searchFaq}
          onChange={(event) => handleChange(event.target.value)}
        />
        <hr />
        <div className={styles.faqItems}>
          {isAuthenticated && (
            <div className={styles.faqAdd}>
              <div
                className={styles.faqAdd_icon}
                onClick={() => handleAddFaq()}
              >
                <span className={styles.faqAdd_icon_plus}>+</span>
              </div>
            </div>
          )}
          {/* <button onClick={() => handleAddFaq()}>Add new faq</button> */}
        </div>
        {faqItems.reverse()}
      </div>
    </main>
  );
};
