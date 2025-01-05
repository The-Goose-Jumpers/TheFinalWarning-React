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

function ScoreButton({ setIsFading, showRankings, setIsFadingIn }) {
  const handleScoreClick = () => {
    setIsFading(true);
    setTimeout(() => {
      showRankings(false);
      setIsFading(false);
      setIsFadingIn(true);
      setTimeout(() => {
        setIsFadingIn(false);
      }, 1500); // Match the duration of the fade-in animation
    }, 1500); // Match the duration of the fade-out animation
  };

  return (
      <button className="ranking-button" onClick={handleScoreClick}>
        Scores
      </button>
  );
}

function ScoreBoardScreen() {
  const [isFadingOut, setIsFadingOut] = useState(false);
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
        <div className={`scoreboard-screen ${isFadingOut ? "fade-out" : ""}`}>
          <div className="score-display">
            <h1 className="scoreboard-title">Scoreboard</h1>
            {error ? (
                <p className="error-message">{error}</p>
            ) : showRankings ? (
                <Rankings />
            ) : (
                <div className="Score-details">
                  <div className="Score-Best">
                    <h2 className="Score-Best-title">Best Score</h2>
                    <p className="Score-Best-score">{scores.bestScore}</p>
                  </div>
                  <div className="Score-Last">
                    <h2 className="Score-Last-title">Last 5 Scores</h2>
                    <ul className="Score-Last-list">
                      {(scores.lastFiveScores || []).map((entry, index) => (
                          <ul className="Score-list" key={index}>
                            Score: {entry.score} {entry.date && <span className="Score-Date">||{entry.date}||</span>}
                          </ul>
                      ))}
                    </ul>
                  </div>
                </div>
            )}
          </div>
          <div className="scoreboard-controls">
            {error ? (
                <p className="error-message">{error}</p>
            ) : showRankings ? (
                <ScoreButton setIsFading={setIsFadingOut} showRankings={setShowRankings} setIsFadingIn={setIsFadingIn} />
            ) : (
                <RankingButton setIsFading={setIsFadingOut} showRankings={setShowRankings} />
            )}
            <BackButton setIsFading={setIsFadingOut} />
          </div>
        </div>
        {isFadingOut && <div className="fade-out-overlay"></div>}
        {isFadingIn && <div className="fade-in-overlay"></div>}
      </div>
  );
}

export default ScoreBoardScreen;