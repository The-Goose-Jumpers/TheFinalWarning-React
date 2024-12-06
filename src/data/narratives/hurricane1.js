// src/data/narratives/mysteryStory.js

import NarrativeNode from "../NarrativeNode";
import Choice from "../Choice";

/**
 * Mystery Story Narrative
 */
const mysteryStory = {
  id: "mysteryStory",
  determineNextNode: (choicesTaken) => {
    // Custom logic for mystery story
    if (choicesTaken.includes("a")) {
      return "node4";
    }
    if (choicesTaken.includes("b")) {
      return "node5";
    }
    return "node5";
  },
  timeUntilDisaster:2880,
  nodes: {
    "start": new NarrativeNode("start", "You just heard the news about the hurricane", "LivingRoom.png", [
      new Choice("a", "I don’t think the situation is that serious.", -5),
      new Choice("b", "I need to prepare my house!", 5),
      new Choice("c", "I need to evacutate!", 5),
    ]),
    "node4": new NarrativeNode("node4", "They say this every time and it always turns out to be fine", "LivingRoom.png", [
      new Choice("d", "I should just ignore and continue my daily routine", -5),
      new Choice("e", "I should call XXXXX to see what they say about this", -5),
      new Choice("f", "This is ridiculous, let’s ignore it. ", -5),
    ]),
    "node5": new NarrativeNode("node5", "You leave the mansion and feel relieved...", "LivingRoom.png", [
      new Choice("e", "Go back home", 0),
    ]),
  },
};

export default mysteryStory;