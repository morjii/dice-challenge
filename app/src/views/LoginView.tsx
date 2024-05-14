import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginView: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission

        try {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email,
            password
        });
     
        console.log('Login successful:', response.data);
        // Store the received token in localStorage or handle as needed
        localStorage.setItem('token', response.data.token);

        // Navigate to another route upon successful login
        navigate('/game');
    } catch (error) {
        console.error('Login failed:', error);
        // Implement error handling and display error messages
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            
            </form>
            <a href="/register"> Pas encore inscrit ?</a>
        </div>
    );
};

export default LoginView;