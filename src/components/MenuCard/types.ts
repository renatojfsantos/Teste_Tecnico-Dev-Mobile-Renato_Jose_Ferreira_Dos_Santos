export interface IMenuCards {
  title: string;
  callback: () => void;
  cardColor?: string;
  selected: boolean;
}

export interface ICardStyles {
  color?: string;
}
