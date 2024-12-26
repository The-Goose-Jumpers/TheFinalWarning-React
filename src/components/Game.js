import { useEffect, useState } from "react";
import "../styles/Game.css";
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

  let result = [];
  if (days > 0) result.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);

  result = result.length > 1
    ? result.slice(0, -1).join(', ') + ' and ' + result.slice(-1)
    : result[0];

  return (
    <span className="timer">Time Left: {result}</span>
  );
}

function Game() {
  /** @type {PlayerTraits} */
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

  useEffect(() => {
    const randomNarrative = NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)];
    setNarrative(randomNarrative);
    setCurrentNode("start");
  }, []);

  function handleChoice(selectedChoices) {
    const totalScore = selectedChoices.reduce((acc, choiceId) => {
      const choice = narrative.nodes[currentNode].choices.find((choice) => choice.id === choiceId);
      return acc + choice.getScore(playerTraits);
    }, 0);

    setScore((prevScore) => prevScore + totalScore);
    setChoicesTaken((prevChoices) => [...prevChoices, ...selectedChoices]);
    const nextNode = narrative.determineNextNode(currentNode, [...choicesTaken, ...selectedChoices]);
    setCurrentNode(nextNode);
  }

  function resetGame() {
    setCurrentNode("start");
    setChoicesTaken([]);
    setScore(0);
    setIsPaused(false); // Close the modal when restarting
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
          Pause
        </button>
        <Timer minutes={narrative.timeUntilDisaster} />
      </div>
      <GameView
        narrativeNode={narrativeNode}
        onChoice={handleChoice}
      />
      {isPaused && (
        <PauseModal onRestart={resetGame} onResume={togglePause} />
      )}
    </>
  );
}

export default Game;