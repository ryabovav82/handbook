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

export const FaqPageUI: FC = () => {
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
        <h1>faq Page</h1>
        <input
          type='text'
          placeholder='поиск по faq'
          value={searchFaq}
          onChange={(event) => handleChange(event.target.value)}
        />
        <hr />
        <div>
          <button onClick={() => handleAddFaq()}>Add new faq</button>
        </div>
        {faqItems.reverse()}
      </div>
    </main>
  );
};
