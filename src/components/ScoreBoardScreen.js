import "../styles/ScoreBoardScreen.css";
import "../styles/Animations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rankings from "./Ranking";

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

function RankingButton({ setIsFading, showRankings }) {
  const handleRankingClick = () => {
    setIsFading(true);
    setTimeout(() => {
      showRankings(true);
      setIsFading(false);
    }, 1500); // Match the duration of the fade-out animation
  };

  return (
    <button className="ranking-button" onClick={handleRankingClick}>
      Rankings
    </button>
  );
}

function ScoreBoardScreen() {
  const [isFading, setIsFading] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [scores, setScores] = useState({ bestScore: 0, lastFiveScores: [] });
  const [error, setError] = useState(null);
  const [showRankings, setShowRankings] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFadingIn(false);
    }, 1500); // Match the duration of the fade-in animation

    try {
      const savedScores = JSON.parse(localStorage.getItem("scores")) || {
        bestScore: 0,
        lastFiveScores: [],
      };

      setScores(savedScores);
    } catch (err) {
      console.error("Error fetching scores:", err);
      setError("Failed to load scores. Please try again later.");
    }
  }, []);

  return (
    <div className="scoreboard">
      <div className={`scoreboard-screen ${isFading ? "fade-out" : ""}`}>
        <div className="score-display">
          <h1 className="scoreboard-title">Scoreboard</h1>
          {error ? (
            <p className="error-message">{error}</p>
          ) : showRankings ? (
            <Rankings />
          ) : (
            <>
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
            </>
          )}
        </div>
        <div className="scoreboard-controls">
          <RankingButton setIsFading={setIsFading} showRankings={setShowRankings} />
          <BackButton setIsFading={setIsFading} />
        </div>
      </div>
      {isFading && <div className="fade-out-overlay"></div>}
      {isFadingIn && <div className="fade-in-overlay"></div>}
    </div>
  );
}

export default ScoreBoardScreen;