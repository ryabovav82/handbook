import { FC, memo } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';
import { NavigateCardUI } from '../ui/navigate-card/navigate-card';

export const NavigateCard: FC<any> = memo(() => (
  <NavigateCardUI content='test' to='/' />
));
