import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../redux/User'


const GameView = () => {
    const [dices, setDices] = useState([]);
    const [result, setResult] = useState('');
    const [pastriesWon, setPastriesWon] = useState(0);
    const [chancesLeft, setChancesLeft] = useState(3); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [pastriesDetails, setPastriesDetails] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    useEffect(() => {
        // Vérifier si l'utilisateur est connecté
        if (!localStorage.getItem('token')) {
            navigate('/'); // Rediriger vers HomeView si non connecté
        }
        checkPastriesLeft();
        if (chancesLeft === 0) {
            setMessage('Dommage, tu n\'as plus de chance');
        }
    }, []); // Ajouté un tableau de dépendances vide pour exécuter une fois au montage

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
            setPastriesDetails(response.data.pastriesDetails);
            setChancesLeft(prev => prev - 1);

            if (response.data.pastriesWon === 0 && chancesLeft <= 1) {
                setMessage('Dommage, tu n\'as plus de chance');
            }
        } catch (error) {
            console.log(error);
            setMessage("Les dés n'ont pas pu être lancés..." + (error.response?.data?.message || error.message));
        }
        setLoading(false);
    };

    console.log("Dices:", dices);
    console.log("Pastries Won:", pastriesWon);
    console.log("Pastries Details:", pastriesDetails);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(deleteUser())
        navigate('/login');
    };

    return (
        <div className="game-view-container">
            <header className="game-header">
                <h1>Lancez les dés </h1>
                <button onClick={handleLogout} className="logout-button">Déconnexion</button>
            </header>
            <button className="roll-button" onClick={rollDices} disabled={loading || chancesLeft === 0}>
                {loading ? 'Lancement...' : 'Lancez les dés'}
            </button>
            {message && <p>{message}</p>}
            {dices.length > 0 && (
                <div className="results-container">
                    <h2>Résultat: {dices.join(', ')}</h2>
                    <p>{result}</p>
                    {pastriesWon > 0 && (
                        <div>
                            <h3>Bravo tu as gagné les pâtisseries suivantes :</h3>
                            {pastriesDetails.map((pastry: { name: string; image: string }) => (
                                <div key={pastry.name} className="pastry">
                                    <img src={`/assets/${pastry.image}`} alt={pastry.name} style={{ width: '100px', height: '100px' }} />
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

