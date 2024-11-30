import { FC, memo } from 'react';
import { NavigateCardUI } from '../ui/navigate-card/navigate-card';

interface CardProps {
  content: string;
  to: string;
  onDelete: () => void; // Пропс для удаления
}

export const NavigateCard: FC<CardProps> = ({ content, to, onDelete }) => (
  <NavigateCardUI content={content} to={to} onDelete={onDelete} />
);
