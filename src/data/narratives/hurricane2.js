// src/data/narratives/adventureStory.js

import NarrativeNode from "../NarrativeNode";
import Choice from "../Choice";

/**
 * Adventure Story Narrative
 */
const adventureStory = {
  id: "adventureStory",
  determineNextNode: (choicesTaken) => {
    // Custom logic for adventure story
    if (choicesTaken.includes("a")) {
      return "node2";
    }
    return "node3";
  },
  timeUntilDisaster:1440,
  nodes: {
    "start": new NarrativeNode("start", "You wake up in a jungle...", "LivingRoom.png", [
      new Choice("a", "Investigate the surroundings", 10),
      new Choice("b", "Go back to sleep", -5),
    ]),
    "node2": new NarrativeNode("node2", "You start exploring the jungle...", "LivingRoom.png", [
      new Choice("c", "Climb a tree", 0),
    ]),
    "node3": new NarrativeNode("node3", "You decide to sleep more...", "LivingRoom.png", [
      new Choice("d", "Sleep until morning", 0),
    ]),
  },
};

export default adventureStory;