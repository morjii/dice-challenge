import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import GameView from './views/GameView';
import BoardView from './views/boardView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/game" element={<GameView />} />
        <Route path="/winners" element={<BoardView />} />
        <Route path="/" element={<LoginView />} />
      </Routes>
    </Router>
  );
}

export default App;