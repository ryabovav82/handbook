import React, { FC, memo, useEffect } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMenuItems,
  delMenuItem,
  getMenuItems
} from '../../services/slices/menuItemSlice';
import { AppDispatch, RootState } from '../../services/store';

export interface CardProps {
  _id: string;
  content: string;
  to: string;
}

interface AppNavigateProps {
  onCardSelect: (id: string) => void;
}

export const AppNavigate: FC<AppNavigateProps> = memo(({ onCardSelect }) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log('Загрузка menuItems...');
    dispatch(getMenuItems());
  }, [dispatch]);

  const {
    data: menuItems,
    isLoading,
    error
  } = useSelector((state: RootState) => state.menuItemsReducer);

  const cards = React.useMemo(
    () =>
      menuItems.map((menuItem) => ({
        _id: menuItem.id.toString(),
        to: `/card/${menuItem.id}`,
        content: menuItem.name
      })),
    [menuItems]
  );

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch, menuItems]);

  function onAddCard() {
    const newMenuItem = {
      id: Date.now(),
      name: 'Шаблон',
      cards: []
    };
    dispatch(addMenuItems(newMenuItem));
  }

  const onDeleteCard = (id: string) => {
    dispatch(delMenuItem(id));
  };

  return (
    <div>
      {/* {isLoading && <div>Загрузка...</div>} */}
      <AppNavigateUI
        cards={cards}
        onAddCard={onAddCard}
        onDeleteCard={onDeleteCard}
      />
    </div>
  );
});
