import { FC } from 'react';
import { FaqPageUI } from '../../components/ui/pages/faq-page';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

export const FaqPage: FC = () => {
  const userData = useSelector((state: RootState) => state.userReducer);
  return (
    <FaqPageUI
      // isCardsLoading={false}
      // isSelected
      isAuthenticated={userData.isAuthenticated}
    />
  );
};
