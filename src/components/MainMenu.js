import "../styles/MainMenu.css";
import "../styles/FadeOut.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HelpButton() {
  return <button className="help-button">?</button>;
}

function PlayButton({ setIsFading }) {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    setIsFading(true);
    setTimeout(() => {
      navigate("/game");
    }, 1500); // Match the duration of the fade-out animation
  };

  return (
      <button className="play-button" onClick={handlePlayClick}>
        Play
      </button>
  );
}

function ScoreBoardButton({ setIsFading }) {
  const navigate = useNavigate();

  const handleScoreClick = () => {
      setIsFading(true);
      setTimeout(() => {
          navigate("/scoreboard");
      }, 1500); // Match the duration of the fade-out animation
  };

  return (
      <button className="scoreboard-button" onClick={handleScoreClick}>
        Scoreboard
      </button>
  );
}

function MainMenu() {
  const [isFading, setIsFading] = useState(false);

  return (
      <div className="main-menu">
        <div className={`tv-screen ${isFading ? 'fade-out' : ''}`}>
          <h1 className="game-title"> THE FINAL WARNING </h1>
          <div className="tv-controls">
            <PlayButton setIsFading={setIsFading} />
            <ScoreBoardButton setIsFading={setIsFading} />
          </div>
        </div>
        <HelpButton />
        {isFading && <div className="fade-out-overlay"></div>}
      </div>
  );
}

export default MainMenu;