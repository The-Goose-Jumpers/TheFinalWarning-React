import NarrativeNode from "../NarrativeNode";
import Choice from "../Choice";
import { all } from "../../utils/arrayUtils";

const mysteryStory = {
  id: "mysteryStory",
  determineNextNode: (currentNode, choicesTaken) => {
    // Custom logic for mystery story
    if (currentNode === "node3") {
      if (all(choicesTaken, "g", "h")) {
        return "node2";
      }
    }
    if (choicesTaken.includes("a")) {
      return "node1";
    }
    if (choicesTaken.includes("b")) {
      return "node3";
    }
    return "node2";
  },
  timeUntilDisaster: 2880,
  nodes: {
    "start": new NarrativeNode("start", "You just heard the news about the hurricane", "LivingRoom.png", [
      new Choice("a", "I don’t think the situation is that serious.", -5),
      new Choice("b", "I need to prepare my house!", 5),
      new Choice("c", "I need to evacuate!", 5),
    ]),
    "node1": new NarrativeNode("node1", "They say this every time and it always turns out to be fine", "LivingRoom.png", [
      new Choice("d", "I should just ignore and continue my daily routine", -5),
      new Choice("e", "I should call XXXXX to see what they say about this", 5),
      new Choice("f", "This is ridiculous, let’s ignore it. ", -5),
    ]),
    "node2": new NarrativeNode("node2", "You leave the mansion and feel relieved...", "LivingRoom.png", [
      new Choice("e", "Go back home", 0),
    ]),
    "node3": new NarrativeNode("node3", "You need to prepare your house for the hurricane. Select all that apply:", "LivingRoom.png", [
      new Choice("g", "Place sandbags to block doorways and prevent flooding", 10),
      new Choice("h", "Barricade windows and doors", 10),
      new Choice("i", "Move outdoor furniture and decorations inside", 10),
      new Choice("j", "Stock up on food, water, batteries and other supplies", 10),
    ], true),
  },
};

export default mysteryStory;