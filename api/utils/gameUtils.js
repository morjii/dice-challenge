// Fonction pour lancer les dés
const rollDices = () => {
    // Générer un tableau de 5 nombres aléatoires entre 1 et 6
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  };
  
  // Fonction pour évaluer les résultats des dés
  const evaluateDices = (dices) => {
    const counts = new Array(7).fill(0);
    dices.forEach(dice => counts[dice]++);
  
    const isYam = counts.includes(5); // 5 dés identiques
    const isCarre = counts.includes(4); // 4 dés identiques
    const isDoublePair = counts.filter(count => count === 2).length === 2; // Deux paires
  
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
  
  // Export des fonctions pour les utiliser dans d'autres parties de l'application
  export default {
    rollDices,
    evaluateDices
  };
  