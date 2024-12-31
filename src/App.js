import React from "react";
import "./styles/App.css"
import Game from "./components/Game"
import MainMenu from "./components/MainMenu";
import ScoreBoardScreen from "./components/ScoreBoardScreen";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/scoreboard" element={<ScoreBoardScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;

