import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LoginView from './views/login/LoginView';
import RegisterView from './views/register/RegisterView';
import GameView from './views/game/GameView';
import BoardView from './views/board/BoardView';
import HomeView from './views/home/HomeView';
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
