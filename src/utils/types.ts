export type UsersType = {
  id: number;
  email: string;
  name: string;
};

export type TCard = {
  id: number;
  menuItemId: number;
  serialNumber: number;
  image: string;
  text: string;
};

export type TMenuItems = {
  id: number;
  name: string;
  cards: TCard[];
};

export type TFaqItems = {
  id: number;
  title: string;
  text: string;
};

export type DBType = {
  users: UsersType[];
  menuItems: TMenuItems[];
  faqItems: TFaqItems[];
};

export type TUser = {
  email: string;
  name: string;
};
