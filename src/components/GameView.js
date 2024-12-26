import { useState } from "react";
import ChoiceButton from "./ChoiceButton";

function GameView({ narrativeNode, onChoice }) {
  const { dialogue, choices, backgroundImage, allowMultipleChoices } = narrativeNode;
  const [selectedChoices, setSelectedChoices] = useState([]);

  function handleChoice(choiceId, isSelected) {
    if (allowMultipleChoices) {
      setSelectedChoices((prevChoices) =>
        isSelected
          ? [...prevChoices, choiceId]
          : prevChoices.filter((id) => id !== choiceId)
      );
    } else {
      onChoice([choiceId]);
    }
  }

  function confirmChoices() {
    onChoice(selectedChoices);
    setSelectedChoices([]);
  }

  return (
    <div className="game-view" style={{ backgroundImage: `url(/images/${backgroundImage})` }}>
      <div className="dialogue">{dialogue}</div>
      <div className="choices">
        {choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            onChoice={handleChoice}
          />
        ))}
      </div>
      {allowMultipleChoices && (
        <button className="confirm-button" onClick={confirmChoices}>
          Confirm Choices
        </button>
      )}
    </div>
  );
}

export default GameView;