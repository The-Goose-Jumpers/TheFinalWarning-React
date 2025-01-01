import { useEffect, useState } from "react";
import "../styles/Game.css";
import "../styles/Animations.css";
import GameView from "./GameView";
import NARRATIVES from "../data/narratives";
import PauseModal from "./PauseModal";

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

function Worries({ playerTraits }) {
  return (
      <div className="worries">
        <div className="worries-title">Worries:</div>
        <div className="worries-list">
          {playerTraits.hasChildren &&
              !playerTraits.hasPets &&
              <div className="worries-item">
                You have kids!
              </div>
          }
          {playerTraits.hasPets &&
              !playerTraits.hasChildren &&
              <div className="worries-item">
                You have pets!
              </div>
          }
          {playerTraits.hasChildren &&
              playerTraits.hasPets &&
              <div className="worries-item">
                You have kids and pets!
              </div>
          }
          {!playerTraits.hasChildren &&
              !playerTraits.hasPets &&
              <div className="worries-item">
                You seem to be worry-free!
                You dont have responsibilities for another living being!
              </div>
          }
        </div>
      </div>
  );
}

function Game() {
  const [playerTraits, setPlayerTraits] = useState({
    hasChildren: false,
    hasPets: false,
    hasFamilyMembersCantEvacuate: false,
    hasFamilyInTheArea: false,
    hasFriendsInTheArea: false,
  });
  const [currentNode, setCurrentNode] = useState("start");
  const [choicesTaken, setChoicesTaken] = useState([]);
  const [score, setScore] = useState(0);
  const [narrative, setNarrative] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isFadingIn, setIsFadingIn] = useState(true);
  const [isPulledDown, setIsPulledDown] = useState(false);

  useEffect(() => {
    const randomNarrative = NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)];
    setNarrative(randomNarrative);
    setCurrentNode("start");
    setTimeLeft(randomNarrative.timeUntilDisaster);
    setTimeout(() => {
      setIsFadingIn(false);
    }, 500); // Match the duration of the fade-in animation
    setPlayerTraits({
        hasChildren: Math.random() < 0.5,
        hasPets: Math.random() < 0.5,
    })
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

  function togglePullDown() {
    setIsPulledDown(!isPulledDown);
  }

  if (!narrative || !currentNode) return <div>Loading...</div>;

  const narrativeNode = narrative.nodes[currentNode];

  return (
      <>
        <div className="topbar">
          <button className="pause-button" onClick={togglePause}></button>
          <div className={`timerbox ${isPulledDown ? 'pulled-down' : ''}`}>
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
            choicesTaken={choicesTaken} // Pass choicesTaken to GameView
            speed={10}
        />
        {isPaused && (
            <PauseModal onRestart={resetGame} onResume={togglePause} />
        )}
        {isFadingIn && <div className="fade-in-overlay"></div>}
      </>
  );
}

export default Game;