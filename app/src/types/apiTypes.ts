export interface User {
  id: string;
  name: string;
}

export interface Pastry {
  id: string;
  name: string;
  image: string;
  stock: number;  // Assurez-vous que le stock est bien géré dans votre modèle MongoDB
}

export interface Winner {
  user: User;
  pastries: Pastry[];
  winDate: string;
}