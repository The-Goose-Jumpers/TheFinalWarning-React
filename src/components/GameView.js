import React from "react";
import ChoiceButton from "./ChoiceButton";

function GameView({dialogue, choices, backgroundImage, onChoice}) {
  return (
    <div className="game-view" style={{backgroundImage: `url(/images/${backgroundImage})`}}>
      <div className="dialogue">{dialogue}</div>
      <div className="choices">
        {choices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            onChoice={onChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default GameView;
