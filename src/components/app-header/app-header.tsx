import { FC } from 'react';
import { AppHeaderUI } from '@ui';

// TODO: реализовать авторизацию, потом подправить (//пример:  const user = useSelector(userSlice.selectors.getUserSelector);
// 	return <AppHeaderUI userName={user?.name} />;)
export const AppHeader: FC = () => <AppHeaderUI userName='Name' />;
