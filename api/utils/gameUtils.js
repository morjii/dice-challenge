// Fonction pour lancer les dés
export const rollDices = () => {
  // Générer un tableau de 5 nombres aléatoires entre 1 et 6
  //return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  return [1,1,1,1,1];
};

// Fonction pour évaluer les résultats des dés
export const evaluateDices = (dices) => {
  const counts = new Array(7).fill(0);
  dices.forEach(dice => counts[dice]++);

  console.log("Counts of each dice side:", counts); // Afficher le décompte des dés

  const isYam = counts.some(count => count === 5); // Vérifie si 5 dés sont identiques
  const isCarre = counts.some(count => count === 4); // Vérifie si 4 dés sont identiques
  const isDoublePair = counts.filter(count => count === 2).length === 2; // Vérifie si deux paires sont présentes

  console.log(`Results - Yam: ${isYam}, Carré: ${isCarre}, Double Pair: ${isDoublePair}`); // Afficher les résultats

  if (isYam) {
    return { win: 'Yam\'s', pastriesWon: 3 };
  } else if (isCarre) {
    return { win: 'Carré', pastriesWon: 2 };
  } else if (isDoublePair) {
    return { win: 'Double Pair', pastriesWon: 1 };
  } else {
    return { win: 'No Win', pastriesWon: 0 };
  }
};

import Pastry from '../models/pastries.js'; // Assurez-vous d'importer le modèle Pastry

// Fonction pour sélectionner des pâtisseries de manière aléatoire
export const selectRandomPastry = async (result) => {
    const pastries = await Pastry.find();
    let pastriesInStock = pastries.filter(pastry => pastry.stock > 0);

    if (pastriesInStock.length === 0) {
        return [];
    }

    let pastriesSelected = [];
    while (result.pastriesWon > 0 && pastriesInStock.length > 0) {
        const randomIndex = Math.floor(Math.random() * pastriesInStock.length);
        const selectedPastry = pastriesInStock[randomIndex];
        selectedPastry.stock--;
        selectedPastry.quantityWon++
        await selectedPastry.save();

        pastriesSelected.push(selectedPastry);
        result.pastriesWon--;

        // Refresh the list of pastries in stock
        pastriesInStock = pastriesInStock.filter(pastry => pastry.stock > 0);
    }

    return pastriesSelected;
};

// Exports pour les utiliser dans d'autres fichiers
export default {
  rollDices,
  evaluateDices,
  selectRandomPastry 
};
