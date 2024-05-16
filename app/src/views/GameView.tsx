import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/User';
import { DiceProps } from '../types/apiTypes';
import gsap from 'gsap';
import './GameView.css';

const GameView = () => {
    const [dices, setDices] = useState([0, 0, 0, 0, 0]);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [pastriesWon, setPastriesWon] = useState(0);
    const [pastriesDetails, setPastriesDetails] = useState([]);
    const [chancesLeft, setChancesLeft] = useState(3);
    const [message, setMessage] = useState('');
    const [showResults, setShowResults] = useState(false); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/');
        }
        checkPastriesLeft();
    }, []);

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

    const rollDices = async () => {
        setLoading(true);
        setShowResults(false); // Reset showResults quand on lance de nouveaux dés
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
            setPastriesDetails(response.data.pastriesDetails);
            setChancesLeft(prev => prev - 1);

            // attendre que l'animation se finissent pour afficher les message
            setTimeout(() => {
                setChancesLeft(prevChancesLeft => {
                    if (response.data.pastriesWon > 0) {
                        setMessage(`Bravo ! Vous avez gagné ${response.data.pastriesWon} pâtisserie(s).`);
                    } else {
                        if (prevChancesLeft > 1) {
                            setMessage('Perdu ! Réessayez.');
                        } else if (prevChancesLeft === 1) {
                            setMessage('Dommage, vous n\'avez plus de chance.');
                        } else {
                            setMessage('Plus de chances restantes.');
                        }
                    }
                    return prevChancesLeft - 1;
                });
                setShowResults(true);
            }, 3000); 
        } catch (error) {
            console.log(error);
            setMessage("Les dés n'ont pas pu être lancés..." + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(deleteUser());
        navigate('/login');
    };

    function launch() {
        if (chancesLeft > 0) {
            rollDices();
        }
    }

    const Dice: React.FC<DiceProps> = React.memo(({ value }) => {
        const diceRef = useRef<HTMLDivElement>(null);

        useLayoutEffect(() => {
            const ctx = gsap.context(() => {
                gsap.from(diceRef.current, {
                    rotationX: 'random(720, 1080)',
                    rotationY: 'random(720, 1080)',
                    duration: 'random(2, 3)'
                });
            }, diceRef);
            return () => ctx.revert();
        }, [value]); // S'assurer que l'effet ne s'exécute que lorsque `value` change

        return (
            <div className="dice" ref={diceRef}>
                {[value, ...gsap.utils.shuffle([1, 2, 3, 4, 5, 6].filter(v => v !== value))].map((face, index) => (
                    <div key={index} className="face">{face}</div>
                ))}
            </div>
        );
    });

    return (
        <div className="game-view-container">
            <header className="game-header">
                <h1>Lancez les dés</h1>
            </header>
            <div className="dice-container">
                {dices.map((dice, index) => <Dice key={index} value={dice} />)}
            </div>
            <div className="actions">
                <button onClick={launch} disabled={loading || chancesLeft === 0}>
                    {loading ? 'Lancement...' : 'Lancez les dés'}
                </button>
            </div>
            {message && <p>{message}</p>}
            {showResults && dices.length > 0 && (
                <div className="results-container">
                    {pastriesWon > 0 && (
                        <div>
                            {pastriesDetails.map((pastry) => (
                                <div key={pastry.name} className="pastry">
                                    <img src={`/assets/${pastry.image}`} alt={pastry.name} style={{ width: '100px', height: '100px' }} />
                                    <p>{pastry.name}</p>
                                </div>
                            ))}
                            <h4>Tu receveras un mail pour récupérer ton gain ! </h4>
                        </div>
                    )}
                </div>
            )}
            <footer>
                <button onClick={handleLogout} className="logout-button">Déconnexion</button>
            </footer>
        </div>
    );
};

export default GameView;
