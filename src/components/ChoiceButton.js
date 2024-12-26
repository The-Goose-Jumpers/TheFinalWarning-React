import React from "react";

function ChoiceButton({choice, onChoice}) {
  return (
    <button onClick={() => onChoice(choice.id)}>{choice.text}</button>
  );
}

export default ChoiceButton;