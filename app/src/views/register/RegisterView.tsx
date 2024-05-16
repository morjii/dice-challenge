import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/pastries-left')
        .then(res => {
            if (res.data.totalLeft === 0) {
                navigate('/board');
            }
        })
        .catch(err => console.error('Impossible de vérifier le stock de pâtisseries:', err));
  }, []);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        name,
        email,
        password
      });
      setMessage('Registered successfully. Please log in.');
      navigate('/login')
    } catch (error) {
      setMessage('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="register-container">
        <h1>Inscription</h1>
        <form onSubmit={handleRegister}>
            <div className="form-group">
                <label htmlFor="name">Nom:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Adresse mail:</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-success">Inscription</button>
            </div>
        </form>
        <div className="text-center mt-3">
            <a href="/login">Déjà inscrit ?</a>
        </div>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
    </div>
);



};

export default RegisterView;
