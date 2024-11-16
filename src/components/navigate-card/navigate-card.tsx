import { FC, memo } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';
import { NavigateCardUI } from '../ui/navigate-card/navigate-card';

interface CardProps {
  content: string;
  to: string;
}
export const NavigateCard: FC<CardProps> = memo(({ content, to }) => (
  <NavigateCardUI content={content} to={to} />
));
