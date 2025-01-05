import "../styles/MainMenu.css";
import "../styles/Animations.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Music } from "../data/assets";
import { initializeAudio, toggleAudio, setVolume } from "../data/AudioUtils";

function HelpButton({ playClickSound }) {
  return <button className="help-button" onClick={playClickSound}>?</button>;
}

function PlayButton({ setIsFading, playClickSound }) {
  const navigate = useNavigate();

  const handlePlayClick = () => {
    playClickSound();
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

function ScoreBoardButton({ setIsFading, playClickSound }) {
  const navigate = useNavigate();

  const handleScoreClick = () => {
    playClickSound();
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
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const clickSound = new Audio(Music.Click);

  useEffect(() => {
    setTimeout(() => {
      setIsFadingIn(false);
    }, 1000); // Match the duration of the fade-in animation
    const { audioElement, gainNode } =
        initializeAudio(`${process.env.PUBLIC_URL}/images/Music/MainMenuSong.ogg`, setAudio, setGainNode);
    setVolume(gainNode, 0.25); // Set initial volume to 0.5
    return () => {
      audioElement.pause();
      audioElement.currentTime = 0;
    };
  }, []);

  const handleToggleMusic = () => {
    toggleAudio(audio, isMusicPlaying);
    setIsMusicPlaying(!isMusicPlaying);
  };

  const playClickSound = () => {
    clickSound.play()
        .then(() => {
          console.log("Audio playback resumed successfully.");
        })
        .catch(error => {
          console.error("Error during audio playback:", error);
        });
  };

  return (
      <div className="main-menu">
        <div className={`tv-screen ${isFading ? 'fade-out' : ''}`}>
          <h1 className="game-title"> THE FINAL WARNING </h1>
          <div className="tv-controls">
            <PlayButton setIsFading={setIsFading} playClickSound={playClickSound} />
            <ScoreBoardButton setIsFading={setIsFading} playClickSound={playClickSound} />
          </div>
        </div>
        <HelpButton playClickSound={playClickSound} />
        <button className="music-toggle-button" onClick={handleToggleMusic}>
          <img src={isMusicPlaying ? Music.TurnOn : Music.TurnOff} alt="Music Toggle" />
        </button>
        {isFading && <div className="fade-out-overlay"></div>}
        {isFadingIn && <div className="fade-in-overlay"></div>}
      </div>
  );
}

export default MainMenu;