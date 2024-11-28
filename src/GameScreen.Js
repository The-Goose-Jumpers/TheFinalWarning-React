import React, { useState } from "react";
//os botoes de pausa e info levam fazem aparecer um retangulo com informacao no ecra 
//Talvez seria melhor criar ficheiros para estes
function PauseButton(){//
    const handlePause = () => {};
    return <button onClick = {handlePause}>

    </button>

}
function InfoButton(){
    const handleInfo= () => {};
    return <button onClick ={handleInfo}>
        
    </button>
}
function Timer({timeLeft,timeCost}){
    <div className="timer">
    <h2>Time Left: {timeLeft-timeCost}s</h2>
  </div>
}

function Option({id,text,scoreImpact,timeCost,onOptionClick}){
    return(
        <button className="option" onClick={onOptionClick}>
            <p>{text}</p>
            {id}
        </button>
    )
}

function GameOptions() {
   
    function handleClick(i){

    }

    return (
            <div className="game-options-row">
            <Option id={0} text={"Prepare the house"} scoreImpact={30} timeCost={-2} onOptionClick={() => handleClick(0)}/>
            <Option id={1} text={"Prepare the house"} scoreImpact={30} timeCost={-2} onOptionClick={() => handleClick(1)}/>
            <Option id={2} text={"Prepare the house"} scoreImpact={30} timeCost={-2} onOptionClick={() => handleClick(2)}/>
        </div>

    );
  }

function GameScreen() {
    const[timeleft, setTimeLeft] = useState();
    const[concerns, setConcerns] = useState();
    const [score, setScore] = useState(0);
    return (
      <div>
      </div>
    );
  }

  export default GameScreen;