export type TFaqProps = {
  id: number;
  title: string;
  text: string;
  handleDelete: (id: number) => void;
  handleSave: (id: number, title: string, text: string) => void;
};
