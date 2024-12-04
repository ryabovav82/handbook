import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';

// TODO: реализовать авторизацию, потом подправить (//пример:  const user = useSelector(userSlice.selectors.getUserSelector);
// 	return <AppHeaderUI userName={user?.name} />;)
export const AppHeader: FC = () => {
  const userData = useSelector((state: RootState) => state.userReducer);
  return <AppHeaderUI userName={userData.data.name} />;
};
