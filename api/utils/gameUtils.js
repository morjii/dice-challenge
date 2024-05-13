// Fonction pour lancer les dés
export const rollDices = () => {
    // Générer un tableau de 5 nombres aléatoires entre 1 et 6
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
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
  
  // Exports pour les utiliser dans d'autres fichiers
  export default {
    rollDices,
    evaluateDices
  };