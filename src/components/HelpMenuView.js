import React, { useState } from "react";
import helpMenuNodes from "../data/narratives/helpMenuNodes"; // Your narrative nodes for the help menu
import "../styles/HelpMenu.css";

function HelpMenuView({ onClose }) {
  const [currentNode, setCurrentNode] = useState("start");

  const narrativeNode = helpMenuNodes[currentNode];

  const handleChoice = (target) => {
    if (target === "close") {
      onClose();
    } else {
      setCurrentNode(target);
    }
  };

  return (
    <div className="help-menu-overlay">
      <div className="help-menu-modal">
        <h1 className="help-menu-title">Help</h1>
        <p className="help-menu-text">{narrativeNode.dialogue}</p>
        <div className="help-menu-buttons">
          {narrativeNode.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoice(choice.target)}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HelpMenuView;