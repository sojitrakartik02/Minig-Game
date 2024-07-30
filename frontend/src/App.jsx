import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ControlPanel from './components/ControlPanel';
import GameBoard from './components/GameBoard';
import './App.css'
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<GameBoard />} />
      <Route path="/control" element={<ControlPanel />} />
    </Routes>
  </Router>
);

export default App;