import { FC } from 'react';
import { FaqItemUI } from '../ui/faq-item';
import { TFaqProps } from './type';
import { delFaqItem } from '../../services/slices/faqSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';

export const FaqItem: FC<TFaqProps> = ({
  id,
  title,
  text,
  handleDelete,
  handleSave
}) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <FaqItemUI
        id={id}
        title={title}
        text={text}
        handleDelete={handleDelete}
        handleSave={handleSave}
      />
    </>
  );
};
