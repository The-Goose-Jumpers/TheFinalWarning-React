import React from "react";

function PauseModal({onRestart, onResume}) {
  return (
    <div className="pause-modal">
      <div className="overlay"></div>
      <div className="modal-content">
        <h2>Game Paused</h2>
        <button onClick={onResume}>Resume</button>
        <button onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}

export default PauseModal;
