import "../styles/MainMenu.css";
import { useNavigate } from "react-router-dom";

function HelpButton() {
  return <button className="help-button">?</button>;
}

function PlayButton() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate("/game"); // Navigates to the game route
  };

  return (
    <button className="play-button" onClick={handlePlayClick}>
      Play
    </button>
  );
}

function ScoreBoardButton() {
  return <button className="scoreboard-button">Scoreboard</button>;
}

function MainMenu() {
  return (
    <div className="main-menu">
      <div className="tv-screen">
        <h1 className="game-title"> THE FINAL WARNING </h1>
        <div className="tv-controls">
          <PlayButton/>
          <ScoreBoardButton/>
        </div>
      </div>
      <HelpButton/>
    </div>
  );
}

export default MainMenu;
