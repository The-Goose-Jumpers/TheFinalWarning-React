import { useEffect, useState } from "react";
import { any, all } from "../utils/arrayUtils";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";
import "../styles/Animations.css";
import GameView from "./GameView";
import NARRATIVES from "../data/narratives";
import PauseModal from "./PauseModal";
import Worries from "../data/Worries";
import { badEnd, goodEndDistract, badEndDistract, badEndPictures, goodEndInterior, badEndInterior, goodEndFlood, badEndFlood } from "../data/narratives/endingsStayed";
import { goodEnd, goodEndGasSation, badEndShortcut, goodEndRoad, badEndRoad, goodEndShelter, goodEndHotel, goodEndFriendsHouse } from "../data/narratives/endingsEvacuated";
import GameOverView from "./GameOverView";
import { initializeAudio, toggleAudio, setVolume } from "../data/AudioUtils";
import { Music } from "../data/assets";

const allbadEndings = [
  badEnd,
  badEndDistract,
  badEndPictures,
  badEndInterior,
  badEndFlood,
  badEndShortcut,
  badEndRoad,
];
const allgoodEndings = [
  goodEndDistract,
  goodEndInterior,
  goodEndFlood,
  goodEnd,
  goodEndGasSation,
  goodEndRoad,
  goodEndShelter,
  goodEndHotel,
  goodEndFriendsHouse
];

function Timer({ minutes }) {
  const days = Math.floor(minutes / 1440);
  minutes %= 1440;
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  return (
      <div className="timer">
        <div className="timer-numbers">
          <span>{days}</span>
          <span>:</span>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
        </div>
        <div className="timer-labels">
          <span>day{days !== 1 ? "s" : ""}</span>
          <span></span>
          <span>hour{hours !== 1 ? "s" : ""}</span>
          <span></span>
          <span>min{minutes !== 1 ? "s" : ""}</span>
        </div>
      </div>
  );
}

function Game() {
  const [playerTraits, setPlayerTraits] = useState({
    hasPets: false,
    hasKids: false,
    hasElderlyNeighbors: false,
    hasFamilyMemberCantEvacuate: false,
    hasExpensiveItems: false,
  });
  const [currentNode, setCurrentNode] = useState("start");
  const [choicesTaken, setChoicesTaken] = useState([]);
  const [score, setScore] = useState(0);
  const [narrative, setNarrative] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isPulledDown, setIsPulledDown] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameOverTextVisible, setIsGameOverTextVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [audio, setAudio] = useState(null);
  const [gainNode, setGainNode] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const randomNarrative = NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)];
    setNarrative(randomNarrative);
    setCurrentNode("start");
    setTimeLeft(randomNarrative.timeUntilDisaster);
    setTimeout(() => {
      setIsFadingIn(false);
    }, 500);
    // Randomize player traits for the game
    setPlayerTraits({
      hasPets: Math.random() > 0.5,
      hasKids: Math.random() > 0.5,
      hasElderlyNeighbors: Math.random() > 0.5,
      hasFamilyMemberCantEvacuate: Math.random() > 0.5,
      hasExpensiveItems: Math.random() > 0.5,
    });
    if(isGameOver){
      const {audioElement, gainNode} =
          initializeAudio(`${process.env.PUBLIC_URL}/images/Music/GameOverSong2.ogg`, setAudio, setGainNode);
      setVolume(gainNode, 0.5); // Set initial volume to 0.5
      return () => {
        audioElement.pause();
        audioElement.currentTime = 0;
      };
    }else {
      const {audioElement, gainNode} =
          initializeAudio(`${process.env.PUBLIC_URL}/images/Music/GameplaySong2.ogg`, setAudio, setGainNode);
      setVolume(gainNode, 0.5); // Set initial volume to 0.5
      return () => {
        audioElement.pause();
        audioElement.currentTime = 0;
      };
    }
  }, []);

  const handleToggleMusic = () => {
    toggleAudio(audio, isMusicPlaying);
    setIsMusicPlaying(!isMusicPlaying);
  };

  function evaluateScoreForTraits() {
    let scoreChange = 0;

    if (playerTraits.hasPets) {
      if (any(choicesTaken, "c11", "c1")) {
        scoreChange -= 50;
      }
      if (any(choicesTaken, "c1", "c12", "c13")) {
        scoreChange += 100;
      }
    }

    if (playerTraits.hasKids) {
      if (!choicesTaken.includes("c1")) {
        scoreChange -= 50;
      }
      if (all(choicesTaken, "c1")) {
        scoreChange += 100;
      }
    }
    if (playerTraits.hasElderlyNeighbors) {
      if (any(choicesTaken, "b9", "b13")) {
        scoreChange += 100;
      } else scoreChange -= 20;
    }
    if (playerTraits.hasFamilyMemberCantEvacuate) {
      if (any(choicesTaken, "c", "a4", "a15", "b11", "b15")) {
        scoreChange -= 50;
      } else scoreChange += 50;
    }

    if (playerTraits.hasExpensiveItems) {
      if (any(choicesTaken, "d", "d0", "d1", "d2", "d3")) {
        scoreChange += 100;
      } else scoreChange -= 50;
    }
    setScore((prevScore) => {
      const newScore = prevScore + scoreChange;
      return newScore < 0 ? 0 : newScore;
    });
  }

  function saveScore(newScore) {
    const today = new Date().toLocaleDateString();
    const savedScores = JSON.parse(localStorage.getItem("scores")) || {
      bestScore: 0,
      lastFiveScores: [],
    };
    const bestScore = Math.max(savedScores.bestScore, newScore);
    const lastFiveScores = [
      { score: newScore, date: today },
      ...savedScores.lastFiveScores.filter(
          (entry) => entry.score !== newScore || entry.date !== today
      ),
    ].slice(0, 5);
    localStorage.setItem(
        "scores",
        JSON.stringify({ bestScore, lastFiveScores })
    );
  }

  function handleChoice(selectedChoices) {
    const totalScore = selectedChoices.reduce((acc, choiceId) => {
      const choice = narrative.nodes[currentNode].choices.find((choice) => choice.id === choiceId);
      return acc + choice.getScore(playerTraits);
    }, 0);

    const totalTimeUsed = selectedChoices.reduce((acc, choiceId) => {
      const choice = narrative.nodes[currentNode].choices.find((choice) => choice.id === choiceId);
      return acc + choice.timeUsed;
    }, 0);

    const shouldResetTime = selectedChoices.some((choiceId) => {
      const choice = narrative.nodes[currentNode].choices.find((choice) => choice.id === choiceId);
      return choice.resetTime;
    });

    setScore((prevScore) => 
      prevScore + totalScore);
    setChoicesTaken((prevChoices) => [...prevChoices, ...selectedChoices]);
    setTimeLeft((prevTimeLeft) => (shouldResetTime ? 0 : prevTimeLeft - totalTimeUsed));

    const nextNode = narrative.determineNextNode(currentNode, [...choicesTaken, ...selectedChoices]);

    // Check if game reaches an ending
    if (any(allbadEndings.map(ending => ending.id), nextNode)) {
      evaluateScoreForTraits();
      setIsGameOver(true);
    } else if (any(allgoodEndings.map(ending => ending.id), nextNode)) {
      evaluateScoreForTraits();
      setIsGameOver(true); // Adjust score based on player traits and choices
    }

    setCurrentNode(nextNode);
  }

  function resetGame() {
    setIsFadingOut(true);
    if(!isGameOver) {
      setTimeout(() => {
        setCurrentNode("start");
        setChoicesTaken([]);
        setScore(0);
        setIsPaused(false);
        setTimeLeft(narrative.timeUntilDisaster);
        setIsGameOver(false);
        setIsGameOverTextVisible(false);
        setIsFadingOut(false);
      }, 500);// Match the duration of the fade-out animation
    }
    else{
      setTimeout(() => {
        setCurrentNode("start");
        setChoicesTaken([]);
        setScore(0);
        setIsPaused(false);
        setTimeLeft(narrative.timeUntilDisaster);
        setIsGameOver(false);
        setIsGameOverTextVisible(false);
        setIsFadingOut(false);
      }, 5000);// Match the duration of the fade-out animation
    }
  }

  function goToMainMenu() {
    setIsFadingOut(true);
    if(!isGameOver){
      setTimeout(() => {
        navigate("/");
      }, 500); // Match the duration of the fade-out animation
    }
    else{
      setTimeout(() => {
        navigate("/");
      }, 5000); // Match the duration of the fade
    }
  }

  function togglePause() {
    setIsPaused(!isPaused);
  }

  function togglePullDown() {
    setIsPulledDown(!isPulledDown);
  }

  function showGameOverText() {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsGameOverTextVisible(true);
      setIsFadingOut(false);
      setIsFadingIn(true);
      setTimeout(() => {
        setIsFadingIn(false);
      }, 5000); // Match the duration of the fade-in animation
    }, 5000); // Match the duration of the fade-out animation
  }

  if (!narrative || !currentNode) return <div>Loading...</div>;

  const narrativeNode = narrative.nodes[currentNode];
  const {dialogue, backgroundImage} = narrativeNode;

  if (isGameOver===true) {
    saveScore(score);
    return (
        <div className="game-over-screen ">
          {!isGameOverTextVisible && (
              <>
                <div className="game-over-context">
                  <p className="End-Mensage">{dialogue}</p>
                  <button className="next-button-end" onClick={showGameOverText}>▽</button>
                </div>
                <button className="music-toggle-button" onClick={handleToggleMusic}>
                  <img src={isMusicPlaying ? Music.TurnOn : Music.TurnOff} alt="Music Toggle"/>
                </button>
              </>
          )}
          {isGameOverTextVisible && (
              <>
                <button className="music-toggle-button" onClick={handleToggleMusic}>
                  <img src={isMusicPlaying ? Music.TurnOn : Music.TurnOff} alt="Music Toggle"/>
                </button>
                <GameOverView
                    score={score}
                    toRestart={resetGame}
                    toMainMenu={goToMainMenu}
                    narrative={narrativeNode}
                />
              </>

          )}
          {isFadingOut && <div className="end-fade-out-overlay"></div>}
          {isFadingIn && <div className="end-fade-in-overlay"></div>}
        </div>
    );
  } else {
    return (
        <>
          <div className="topbar">
            <button className="pause-button" onClick={togglePause}></button>
            <div className={`timerbox ${isPulledDown ? "pulled-down" : ""}`}>
              <div className="worries-display">
                <Worries playerTraits={playerTraits}/>
              </div>
              <div className="time-left">Time until disaster:</div>
              <Timer minutes={timeLeft}/>
              <button className="pull-down-button" onClick={togglePullDown}></button>
            </div>
            <button className="music-toggle-button" onClick={handleToggleMusic}>
              <img src={isMusicPlaying ? Music.TurnOn : Music.TurnOff} alt="Music Toggle" />
            </button>
          </div>
          <GameView
              narrativeNode={narrativeNode}
              onChoice={handleChoice}
              choicesTaken={choicesTaken}
              speed={10}
          />
          {isPaused && <PauseModal onResume={togglePause} onMainMenu={goToMainMenu} />}
          {isFadingIn && <div className="fade-in-overlay"></div>}
          {isFadingOut && <div className="fade-out-overlay"></div>}
        </>
    );
  }
}

export default Game;