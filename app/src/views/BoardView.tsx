import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Winner } from '../types/apiTypes';
import { useNavigate } from 'react-router-dom'; // Assurez-vous d'importer useHistory de 'react-router-dom'

const BoardView: React.FC = () => {
    const [winners, setWinners] = useState<Winner[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [gameEnded, setGameEnded] = useState(false);
    const history = useNavigate(); // Utilisez useHistory pour la redirection

    useEffect(() => {
        const fetchGameStatus = async () => {
            try {
                const response = await axios.get<{ gameEnded: boolean }>('http://localhost:3001/api/game/check-game-end');
                setGameEnded(response.data.gameEnded);
                if (!response.data.gameEnded) {
                    history('/'); // Redirige vers la page d'accueil si le jeu n'est pas terminé
                }
            } catch (err) {
                console.error('Failed to check game status:', err);
            }
        };

        fetchGameStatus();
        if (gameEnded) {
            const fetchWinners = async () => {
                try {
                    const response = await axios.get<Winner[]>('http://localhost:3001/api/winners');
                    setWinners(response.data);
                    setLoading(false);
                } catch (err: any) {
                    setError('Failed to fetch winners: ' + err.message);
                    setLoading(false);
                }
            };
            fetchWinners();
        }
    }, [gameEnded, history]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Winners Board</h1>
            <p>The game has ended. Here are the results:</p>
            <ul>
                {winners.map((winner) => (
                    <li key={winner.user.id}>
                        <h2>{winner.user.name}</h2>
                        <p>Won at: {new Date(winner.winDate).toLocaleString()}</p>
                        <p>Pastries won:</p>
                        <ul>
                            {winner.pastries.map(pastry => (
                                <li key={pastry.id}>
                                    {pastry.name} - Stock left: {pastry.stock}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BoardView;