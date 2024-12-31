// src/components/Game.js
import { useEffect, useState } from "react";
import "../styles/Game.css";
import "../styles/Animations.css";
import GameView from "./GameView";
import NARRATIVES from "../data/narratives";
import PauseModal from "./PauseModal";

/**
 * @typedef {Object} PlayerTraits
 * @property {boolean} hasChildren - Whether the player has children
 * @property {boolean} hasPets - Whether the player has pets
 * @property {boolean} hasCar - Whether the player has a car
 */

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
            <span>day{days !== 1 ? 's' : ''}</span>
            <span></span>
            <span>hour{hours !== 1 ? 's' : ''}</span>
            <span></span>
            <span>min{minutes !== 1 ? 's' : ''}</span>
          </div>
      </div>
  );
}

function Game() {
  const [playerTraits, setPlayerTraits] = useState({
    hasChildren: Math.random() < 0.5,
    hasPets: Math.random() < 0.5,
    hasCar: Math.random() < 0.5,
  });
  const [currentNode, setCurrentNode] = useState("start");
  const [choicesTaken, setChoicesTaken] = useState([]);
  const [score, setScore] = useState(0);
  const [narrative, setNarrative] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFadingIn, setIsFadingIn] = useState(true);

  useEffect(() => {
    const randomNarrative = NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)];
    setNarrative(randomNarrative);
    setCurrentNode("start");
    setTimeLeft(randomNarrative.timeUntilDisaster);
    setTimeout(() => {
      setIsFadingIn(false);
    }, 500); // Match the duration of the fade-in animation
  }, []);

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
    setTimeLeft((prevTimeLeft) => shouldResetTime ? 0 : prevTimeLeft - totalTimeUsed);
    const nextNode = narrative.determineNextNode(currentNode, [...choicesTaken, ...selectedChoices]);
    setCurrentNode(nextNode);
  }

  function resetGame() {
    setCurrentNode("start");
    setChoicesTaken([]);
    setScore(0);
    setIsPaused(false); // Close the modal when restarting
    setTimeLeft(narrative.timeUntilDisaster);
  }

  function togglePause() {
    setIsPaused(!isPaused);
  }

  if (!narrative || !currentNode) return <div>Loading...</div>;

  const narrativeNode = narrative.nodes[currentNode];

  return (
      <>
        <div className="topbar">
          <button className="pause-button" onClick={togglePause}>
          </button>
          <div className="timerbox">
            <div className="time-left">Time until disaster:</div>
            <Timer minutes={timeLeft} />
          </div>
        </div>
        <GameView
            narrativeNode={narrativeNode}
            onChoice={handleChoice}
            speed={10}
        />
        {isPaused && (
            <PauseModal onRestart={resetGame} onResume={togglePause}/>
        )}
        {isFadingIn && <div className="fade-in-overlay"></div>}
      </>
  );
}

export default Game;