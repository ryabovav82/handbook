import React, { FC, memo, useEffect } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';
import { useSelector, useDispatch } from 'react-redux';
import {
  addMenuItems,
  delMenuItem,
  getMenuItems,
  setSelectedMenuItem
} from '../../services/slices/menuItemSlice';
import { AppDispatch, RootState } from '../../services/store';
import { TCard } from '@utils-types';
import { addCard } from '../../services/slices/cardSlice';

export const mockCards: TCard[] = [
  {
    id: 1,
    menuItemId: 101,
    serialNumber: 1,
    image: 'https://via.placeholder.com/150',
    text: 'Карточка 1.'
  },
  {
    id: 2,
    menuItemId: 102,
    serialNumber: 2,
    image: 'https://via.placeholder.com/150/0000FF/808080',
    text: 'Карточка 2.'
  }
];

export interface CardProps {
  _id: number;
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
  }, []);

  const {
    data: menuItems,
    isLoading,
    error
  } = useSelector((state: RootState) => state.menuItemsReducer);

  const cards = React.useMemo(
    () =>
      menuItems.map((menuItem) => ({
        _id: menuItem.id,
        to: `${menuItem.id}`,
        content: menuItem.name
      })),
    [menuItems]
  );

  function onAddCard() {
    const newMenuItem = {
      id: Date.now(),
      name: 'Шаблон',
      cards: mockCards
    };
    dispatch(addMenuItems(newMenuItem));
    // dispatch(
    //   addCard({
    //     id: 11,
    //     menuItemId: newMenuItem.id,
    //     serialNumber: 1,
    //     image: 'http://localhost:3001/menuitem/card/images/11.jpg',
    //     text: 'text_1_1'
    //   })
    // );
    console.log(`Добавление карточки ${JSON.stringify(newMenuItem, null, 2)}`);
  }

  const onDeleteCard = async (id: string) => {
    try {
      await dispatch(delMenuItem(id)).unwrap();
      console.log(`Карточка с ID ${id} успешно удалена`);
      // Обновляем список menuItems
      dispatch(getMenuItems());
    } catch (error) {
      console.error('Ошибка при удалении карточки:', error);
    }
  };

  const handleClick = (id: string) => {
    const selectedMenuItem = menuItems.find(
      (menuItem) => menuItem.id.toString() === id
    );
    if (selectedMenuItem) {
      dispatch(setSelectedMenuItem(selectedMenuItem));
    }
  };

  return (
    <div>
      {/* {isLoading && <div>Загрузка...</div>} */}
      <AppNavigateUI
        cards={cards}
        onAddCard={onAddCard}
        onDeleteCard={onDeleteCard}
        onSelectCard={handleClick}
      />
    </div>
  );
});
