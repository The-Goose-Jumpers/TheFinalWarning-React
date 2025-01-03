import React, { useState, useEffect, useRef } from "react";
import ChoiceButton from "./ChoiceButton";

function GameView({ narrativeNode, onChoice, choicesTaken, speed = 100 }) {
    const { dialogue, choices, backgroundImage, allowMultipleChoices } = narrativeNode;
    const [selectedChoices, setSelectedChoices] = useState([]);
    const [displayedText, setDisplayedText] = useState('');
    const [isDialogueComplete, setIsDialogueComplete] = useState(false);
    const indexRef = useRef(0);
    const frameRef = useRef(null);
    const lastTimeRef = useRef(0);

    /* text animations */
    useEffect(() => {
        setDisplayedText(''); // Reset displayed text
        setIsDialogueComplete(false); // Reset dialogue completion state
        indexRef.current = 0;
        lastTimeRef.current = performance.now();

        const typeText = (time) => {
            if (time - lastTimeRef.current >= speed) {
                setDisplayedText((prev) => prev + dialogue.charAt(indexRef.current));
                indexRef.current++;
                lastTimeRef.current = time;
            }
            if (indexRef.current < dialogue.length) {
                frameRef.current = requestAnimationFrame(typeText);
            } else if (displayedText !== dialogue) {
                setDisplayedText(dialogue); // Ensure the text matches the dialogue
                setIsDialogueComplete(true); // Mark dialogue as complete
            }
        };

        frameRef.current = requestAnimationFrame(typeText);

        return () => cancelAnimationFrame(frameRef.current);
    }, [dialogue, speed]);

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
        <div className={`game-view ${isDialogueComplete ? 'show-choices' : ''}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="textbox">
                <div className="dialogue">{displayedText}</div>
            </div>
            {isDialogueComplete && (
                <div className="choices">
                     {(choices || []).filter((choice) => !choicesTaken.includes(choice)).map((choice)=>(
                        <ChoiceButton
                            key={choice.id}
                            choice={choice}
                            onChoice={handleChoice}
                        />
                    ))}
                </div>
            )}
            {allowMultipleChoices && isDialogueComplete && (
        
                <button className="confirm-button" onClick={confirmChoices}>
                    Confirm Choices
                </button>
            )}
        </div>
    );
}

export default GameView;