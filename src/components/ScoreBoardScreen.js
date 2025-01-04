import "../styles/ScoreBoardScreen.css";
import "../styles/Animations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ setIsFading }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/");
    }, 1500); // Match the duration of the fade-out animation
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      Back
    </button>
  );
}

function RankingButton({ setIsFading }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/RankingScreen");
    }, 1500); // Match the duration of the fade-out animation
  };

  return (
    <button className="back-button" onClick={handleBackClick}>
      Ranking
    </button>
  );
}

function ScoreBoardScreen() {
  const [isFading, setIsFading] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [scores, setScores] = useState({ bestScore: 0, allScores: [], lastFiveScores: [] });

  useEffect(() => {
    setTimeout(() => {
      setIsFadingIn(false);
    }, 1500); // Match the duration of the fade-in animation

    const savedScores = JSON.parse(localStorage.getItem("scores")) || {
      bestScore: 0,
      allScores: [],
      lastFiveScores: [],
    };

    setScores(savedScores);
  }, []);

  return (
    <div className="scoreboard">
      <div className={`scoreboard-screen ${isFading ? "fade-out" : ""}`}>
        <div className="score-display">
          <h1 className="scoreboard-title">Scoreboard</h1>
          <div>
            <h2>Best Score</h2>
            <p>{scores.bestScore}</p>
          </div>
          <div>
            <h2>Last 5 Scores</h2>
            <ul>
              {(scores.lastFiveScores || []).map((entry, index) => (
                <li key={index}>
                  Score: {entry.score} {entry.date && <span>({entry.date})</span>}
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div className="scoreboard-controls">
          <BackButton setIsFading={setIsFading} />
        </div>
      </div>
      {isFading && <div className="fade-out-overlay"></div>}
      {isFadingIn && <div className="fade-in-overlay"></div>}
    </div>
  );
}

export default ScoreBoardScreen;
