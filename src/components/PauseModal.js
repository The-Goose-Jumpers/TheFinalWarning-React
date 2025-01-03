import React from "react";

function PauseModal({ onRestart, onResume, onMainMenu }) {
  return (
    <div className="pause-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Game Paused</h2>
        <button onClick={onResume}>Resume</button>
        <button onClick={onMainMenu}>Go Back to Main Menu</button>
      </div>
    </div>
  );
}

export default PauseModal;
