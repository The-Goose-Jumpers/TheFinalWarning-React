import React, { useState } from "react";
import "../styles/Game.css";
import { db } from "./dataBase/firebase";
import { collection, addDoc } from "firebase/firestore";

function GameOverView({ score, toRestart, toMainMenu, narrative }) {
  const { backgroundImage } = narrative;
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const today = new Date().toLocaleDateString();
    try {
      // Save to Firestore
      await addDoc(collection(db, "rankings"), {
        name: playerName,
        score,
        date: today,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
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
        {!submitted ? (
          <div className="game-over-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={!playerName}>
              Submit Score
            </button>
          </div>
        ) : (
          <div className="game-over-thank-you">
            <p>Thank you, {playerName}! Your score has been submitted.</p>
            <button onClick={toRestart}>Play Again</button>
            <button onClick={toMainMenu}>Main Menu</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameOverView;
