import { useState } from "react";

function ChoiceButton({choice, onChoice}) {
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected(!selected);
    onChoice(choice.id, !selected);
  }

  return (
    <button
      className={`choice-button ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {choice.text}
    </button>
  );
}

export default ChoiceButton;