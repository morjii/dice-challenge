import React, { useEffect, useState } from 'react';
import { Winner2 } from '../../types/apiTypes';


const BoardView: React.FC = () => {
    const [winners, setWinners] = useState<Winner2[]>([]);

    useEffect(() => {
        fetch('http://localhost:3001/board')
        .then(res => res.json())
        .then(
            (result) => {
                setWinners(result);
            }
        )
    }, []);
    console.log(winners)

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Fin du jeu concours : Félicitations aux gagnants !</h1>
            {winners.length > 0 ? (
                <div className="row">
                    {winners.map((winner, index) => (
                        <div key={index} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-header">
                                    Gagnant: {winner.userName}
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Date de victoire: {new Date(winner.date).toLocaleDateString()}</p>
                                    <p className="card-text">Pâtisserie(s) gagnée(s): {winner.pastry?.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-info" role="alert">
                    Pas de gagnants pour le moment
                </div>
            )}
        </div>
    );



};

export default BoardView;