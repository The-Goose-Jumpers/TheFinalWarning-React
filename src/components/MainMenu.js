
import "../styles/MainMenu.css"; 

function HelpButton() {
  return <button className="help-button" >?</button>;
}

function PlayButton() {
  return <button className="play-button">Play</button>;
}

function ScoreBoardButton() {
  return <button className="scoreboard-button" >Scoreboard</button>;
}

function MainMenu() {
  return (
    <div className="main-menu">
      <div className="tv-screen">
        <h1 className="game-title"> THE FINAL WARNING </h1>
        <div className="tv-controls">
          <PlayButton />
          <ScoreBoardButton />
        </div>
      </div>
      <HelpButton />
    </div>
  );
}

export default MainMenu;
