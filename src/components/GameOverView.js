import React from 'react';
import '../styles/Game.css';

function GameOverView({ score, toRestart, toMainMenu, narrative }) {
  const { backgroundImage } = narrative;

  return (
      <div className="game-over-score"style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="game-over-layout" >
              <h1 className="game-over-title">Game Over</h1>
              <p className="game-over-score-display">Your final score is: {score}</p>
              <div className="game-over-controls">
                  <button onClick={toRestart}>Restart Game</button>
                  <button onClick={toMainMenu}>Main Menu</button>
              </div>
          </div>
      </div>
  );
}


export default GameOverView;