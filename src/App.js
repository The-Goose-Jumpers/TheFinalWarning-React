import React from "react";
import "./styles/App.css"
import Game from "./components/Game"
import MainMenu from "./components/MainMenu";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;

