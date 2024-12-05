import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { NavigateCardUI } from '../ui/navigate-card/navigate-card';

interface CardProps {
  id: number;
  content: string;
  to: string;
  onDelete: () => void;
  onSelect?: (id: string) => void;
}

export const NavigateCard: FC<CardProps> = ({
  id,
  content,
  to,
  onDelete,
  onSelect
}) => {
  const selectedMenuItem = useSelector(
    (state: RootState) => state.menuItemsReducer.isSelected
  );
  const isSelected = selectedMenuItem?.id === id;

  return (
    <NavigateCardUI
      id={id}
      content={content}
      to={to}
      onDelete={onDelete}
      onSelect={onSelect}
      isSelected={isSelected}
    />
  );
};
