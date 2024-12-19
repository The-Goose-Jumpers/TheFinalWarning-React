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
      return "node4";
    }
    if (choicesTaken.includes("a1"&&"a2")) { // a1 is temporary until we figure out what to do 
      return "node5";
    }
    return "node5";
  },
  timeUntilDisaster:1440,
  nodes: {
    "start": new NarrativeNode("start", "You just heard the news about the hurricane", "LivingRoom.png", [
      new Choice("a", "I don’t think the situation is that serious.", -5),
      new Choice("b", "I need to prepare my house!", 5),
      new Choice("c", "I need to evacutate!", 5),
    ]),
    "node4": new NarrativeNode("node4", "They say this every time and it always turns out to be fine", "LivingRoom.png", [
      new Choice("a1", "I should just ignore and continue my daily routine", -5),
      new Choice("a2", "I should call someone to see what they say about this", 5),
    ]),
    "node5": new NarrativeNode("node5", "The person says the situation is very serious, they are getting ready to evacuate", "LivingRoom.png", [
      new Choice("a3", "This is ridiculous, let’s ignore it. ", -10),
      new Choice("a4", "This is serious I will try to evacuate", 10 ),
      new Choice("a5", "I will prepare my house", 5),
    ]),
  },
};

export default adventureStory;