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
    if (choicesTaken.includes("b")) {
      return "node4";
    }
    return "node5";
  },
  timeUntilDisaster:2880,
  nodes: {
    "start": new NarrativeNode("start", "You arrive at a mysterious mansion...", "LivingRoom.png", [
      new Choice("a", "Explore the mansion", 5),
      new Choice("b", "Leave immediately", -5),
    ]),
    "node4": new NarrativeNode("node4", "The mansion is eerily quiet...", "LivingRoom.png", [
      new Choice("c", "Search the basement", 10),
    ]),
    "node5": new NarrativeNode("node5", "You leave the mansion and feel relieved...", "LivingRoom.png", [
      new Choice("d", "Go back home", 0),
    ]),
  },
};

export default mysteryStory;