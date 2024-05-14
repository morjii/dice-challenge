import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Winner } from '../types/apiTypes';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useHistory de 'react-router-dom'

const BoardView: React.FC = () => {
    const [winners, setWinners] = useState<Winner[]>([]);

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
        <div>
            <h1>Winners Board</h1>
            { winners.length > 0 && (
                <div>
                    {winners.map((winner) => (
                        <div>
                            <p>Winner: {winner.userName}</p> 
                            <p>Date: {winner.date}</p> 
                            <p>Pâtisserie(s) gagnée(s): {winner.pastry}</p> 
                        </div>
                        
                    ))}

                </div>
            )}
        </div>
    );
};

export default BoardView;