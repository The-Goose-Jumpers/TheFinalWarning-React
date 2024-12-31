import "../styles/ScoreBoardScreen.css";
import "../styles/Animations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BackButton({setIsFading}) {
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
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsFadingIn(false);
    }, 1500); // Match the duration of the fade-in animation
  }, []);

  return (
    <div className="scoreboard">
      <div className={`scoreboard-screen ${isFading ? 'fade-out' : ''}`}>
        <div className="score-display">
          <h1 className="scoreboard-title"> Scoreboard </h1>
        </div>

        <div className="scoreboard-controls">
          <BackButton setIsFading={setIsFading}/>
        </div>
      </div>
      {isFading && <div className="fade-out-overlay"></div>}
      {isFadingIn && <div className="fade-in-overlay"></div>}
    </div>
  );
}

export default ScoreBoardScreen;