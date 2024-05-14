import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import GameView from './views/GameView';
import BoardView from './views/BoardView';
import HomeView from './views/HomeView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/game" element={<GameView />} />
        <Route path="/board" element={<BoardView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </Router>
  );
}

export default App;
