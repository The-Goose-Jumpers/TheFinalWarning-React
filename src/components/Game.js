import { useEffect, useState } from "react";
import { any,all } from "../utils/arrayUtils";
import { useNavigate } from "react-router-dom";
import "../styles/Game.css";
import "../styles/Animations.css";
import GameView from "./GameView";
import NARRATIVES from "../data/narratives";
import PauseModal from "./PauseModal";
import Worries from "../data/Worries";
import { badEnd, goodEndDistract, badEndDistract, badEndPictures, goodEndInterior, badEndInterior, goodEndFlood, badEndFlood } from "../data/narratives/EndingsStayed";
import { goodEnd, goodEndGasSation, badEndShortcut, goodEndRoad, badEndRoad, goodEndShelter, goodEndHotel, goodEndFriendsHouse } from "../data/narratives/EndingsEvacuated";

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
  }, []);


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
    setScore((prevScore) => prevScore + scoreChange);
  }


  function saveScore(newScore) {
    const today = new Date().toLocaleDateString(); 
    const savedScores = JSON.parse(localStorage.getItem("scores")) || {
      bestScore: 0,
      allScores: [], 
      lastFiveScores: [],
    };
    const bestScore = Math.max(savedScores.bestScore, newScore);
    const allScores = (savedScores.allScores || []).concat({ score: newScore, date: today });
    const lastFiveScores = allScores.slice(-5);
    localStorage.setItem(
      "scores",
      JSON.stringify({ bestScore, allScores, lastFiveScores })
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

    setScore((prevScore) => prevScore + totalScore);
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
    setCurrentNode("start");
    setChoicesTaken([]);
    setScore(0);
    setIsPaused(false);
    setTimeLeft(narrative.timeUntilDisaster);
    setIsGameOver(false);
  }
  function goToMainMenu () {
    
  }

  function togglePause() {
    setIsPaused(!isPaused);
  }

  function togglePullDown() {
    setIsPulledDown(!isPulledDown);
  }

  if (!narrative || !currentNode) return <div>Loading...</div>;

  const narrativeNode = narrative.nodes[currentNode];

  if (isGameOver===true) {
    saveScore(score);
    return (
      <div className="game-over">
        <h1>Game Over</h1>
        <p>Your final score is: {score}</p>
        <button onClick={resetGame}>Restart Game</button>
      </div>
    );
  }

  return (
    <>
      <div className="topbar">
        <button className="pause-button" onClick={togglePause}></button>
        <div className={`timerbox ${isPulledDown ? "pulled-down" : ""}`}>
          <div className="worries-display">
            <Worries playerTraits={playerTraits} />
          </div>
          <div className="time-left">Time until disaster:</div>
          <Timer minutes={timeLeft} />
          <button className="pull-down-button" onClick={togglePullDown}></button>
        </div>
      </div>
      <GameView
        narrativeNode={narrativeNode}
        onChoice={handleChoice}
        choicesTaken={choicesTaken}
        speed={10}
      />
      {isPaused && <PauseModal onRestart={resetGame} onResume={togglePause} />}
      {isFadingIn && <div className="fade-in-overlay"></div>}
    </>
  );
}



export default Game;
