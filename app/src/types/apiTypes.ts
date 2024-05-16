export interface User {
  id: string;
  name: string;
}

export interface Pastry {
  id: string;
  name: string;
  image: string;
  stock: number; 
}

export interface Winner {
  user: User;
  pastries: Pastry[];
  winDate: string;
  date: Date; 
}

export interface DiceProps {
  value: number;
}