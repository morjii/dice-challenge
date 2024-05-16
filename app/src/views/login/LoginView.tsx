import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/User'
import './LoginView.css';

const LoginView: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email,
            password
        });

     
        console.log('Connexion réussie:', response.data);
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        dispatch(addUser({ email: response.data.email, name: response.data.name, token: response.data.token, chancesLeft: response.data.chancesLeft, pastriesWon: response.data.pastriesWon}))

        // Navigate to the game route
        navigate('/game');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("Une erreur s'est produite");
        }
        console.error('Connexion échouée:', error);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3001/pastries-left')
            .then(res => {
                if (res.data.totalLeft === 0) {
                    navigate('/board');
                }
            })
            .catch(err => console.error('Impossible de vérifier le stock de pâtisseries:', err));
    }, []);

    return (
        <div className="login-container">
            <h1>Connexion</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email" className="label">Adresse mail:</label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button">Log In</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
            <div className="text-center mt-3">
                <a href="/register">Pas encore inscrit ?</a>
            </div>
        </div>
    );



};

export default LoginView;