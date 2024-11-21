import { FC, memo, useState } from 'react';
import { AppNavigateUI } from '../ui/app-navigate';

export interface CardData {
  _id: string;
  content: string;
  creator: string;
}

export interface CardProps {
  _id: string;
  to: string;
  content: string;
}
export const AppNavigate: FC<any> = memo(() => {
  const [cards, setCards] = useState<CardProps[]>([
    { _id: '1', to: '/card/1', content: 'test1' },
    { _id: '2', to: '/card/2', content: 'test2' },
    { _id: '3', to: '/card/3', content: 'test3' },
    { _id: '4', to: '/card/4', content: 'test4' },
    { _id: '5', to: '/card/5', content: 'test5' },
    { _id: '6', to: '/card/6', content: 'test6' },
    { _id: '7', to: '/card/7', content: 'test7' },
    { _id: '8', to: '/card/8', content: 'test8' }
  ]);
  return <AppNavigateUI cards={cards} />;
});
