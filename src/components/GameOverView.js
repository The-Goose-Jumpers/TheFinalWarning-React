import React, { useState } from "react";
import "../styles/Game.css";
import { addScore } from "../lib/databaseUtils";

function GameOverView({ score, toRestart, toMainMenu, narrative }) {
  const { backgroundImage } = narrative;
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for showing the name submission form

  const handleScoreSubmit = async () => {
    const success = await addScore(playerName, score);
    if (success) {
      setSubmitted(true);
      setIsSubmitting(false); // Return to Game Over menu
    }
  };

  return (
    <div
      className="game-over-score"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="game-over-layout">
        <h1 className="game-over-title">Game Over</h1>
        <p className="game-over-score-display">Your final score is: {score}</p>

        {!isSubmitting && !submitted && (
          <div className="game-over-controls">
            <button onClick={() => setIsSubmitting(true)}>Submit Score</button>
            <button onClick={toRestart}>Play Again</button>
            <button onClick={toMainMenu}>Main Menu</button>
          </div>
        )}

        {isSubmitting && (
          <div className="game-over-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleScoreSubmit} disabled={!playerName}>
              Submit
            </button>
          </div>
        )}

        {submitted && (
          <div className="game-over-controls">
            {/* <p>Thank you, {playerName}, for submitting your score!</p> */}
            <button onClick={toRestart}>Play Again</button>
            <button onClick={toMainMenu}>Main Menu</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameOverView;
