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

export interface Winner2 {
  id: string; // Ajout de l'identifiant du gagnant
  userName: string; // Nom de l'utilisateur gagnant
  pastry: Pastry[]; // Liste des noms des pâtisseries gagnées
  date: Date; // Date de la victoire
  number: number; // Nombre associé, peut-être le nombre de pâtisseries gagnées ou autre
}


export interface DiceProps {
  value: number;
}