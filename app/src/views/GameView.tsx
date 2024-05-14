import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GameView = () => {
    const [dices, setDices] = useState([]);
    const [result, setResult] = useState('');
    const [pastriesWon, setPastriesWon] = useState(0);
    const [chancesLeft, setChancesLeft] = useState(3); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkPastriesLeft = async () => {
        try {
            const response = await axios.get('http://localhost:3001/pastries-left');
            if (response.data.totalLeft === 0) {
                navigate('/board');
            }
        } catch (error) {
            console.error('Impossible de vérifier le stock de pâtisseries:', error);
        }
    };

    useEffect(() => {
        checkPastriesLeft();
    }, [dices]); // Dépendance à dices pour vérifier après chaque lancer

    const rollDices = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.get('http://localhost:3001/api/game/roll-dices', {
                headers: {
                    'Content-type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            });
            setDices(response.data.dices);
            setResult(response.data.result);
            setPastriesWon(response.data.pastriesWon);

            setMessage(`You rolled: ${response.data.dices.join(', ')}. Result: ${response.data.result}. Pastries won: ${response.data.pastriesWon}`);
        } catch (error) {
            console.log(error);
            setMessage('Failed to roll dices: ' + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="game-view-container">
            <header className="game-header">
                <h1>Let's Play the Dice Game!</h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <button className="roll-button" onClick={rollDices} disabled={loading}>
                {loading ? 'Rolling...' : 'Roll Dices'}
            </button>
            {dices.length > 0 && (
                <div className="results-container">
                    <h2>Dice Rolls: {dices.join(', ')}</h2>
                    <p>Result: {result}</p>
                    {pastriesWon.length > 0 && (
                        <div>
                            <h3>Congratulations, you won:</h3>
                            {pastriesWon.map(pastry => (
                                <div key={pastry.name} className="pastry">
                                    <img src={`/assets/${pastry.image}`} alt={pastry.name} />
                                    <p>{pastry.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );






};


export default GameView;
