import "../styles/ScoreBoardScreen.css";
import { useState } from "react";
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

function ScoreBoardScreen() {
  const [isFading, setIsFading] = useState(false);

  return (
      <div className="scoreboard">
        <div className={`scoreboard-screen ${isFading ? 'fade-out' : ''}`}>
          <h1 className="scoreboard-title"> Scoreboard </h1>
          <div className="scoreboard-controls">
            <BackButton isFading={setIsFading} />
          </div>
        </div>
        {isFading && <div className="fade-out-overlay"></div>}
      </div>
  );
}

export default ScoreBoardScreen;