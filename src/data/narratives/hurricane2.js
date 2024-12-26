import NarrativeNode from "../NarrativeNode";
import Choice from "../Choice";

const adventureStory = {
  id: "adventureStory",
  determineNextNode: (currentNode, choicesTaken) => {
    if (currentNode === "start") {
      if (choicesTaken.includes("a")) {
        return "node4";
      } else if (choicesTaken.includes("b")) {
        return "node8";
      }else if (choicesTaken.includes("c")) {
        return "node10";
      }
    }
      if (currentNode === "node4") {
        if (choicesTaken.includes("a1")) {
          return "node6";
        } else if (choicesTaken.includes("a2")) {
          return "node5";
        }
      }
      if (currentNode === "node5") {
        if (choicesTaken.includes("a3")) {
          return "node6";
        } else if (choicesTaken.includes("a4")) {
          return "node10";
        } else if (choicesTaken.includes("a5")) {
          return "node8";
      }
    }
    if (currentNode === "node6") {
      if (choicesTaken.includes("a11")) {
        return "node7";
      } 
      if (currentNode === "node7") {
        if (choicesTaken.includes("a13")) {
          return "node8";
        } 
      }
    }
    if (currentNode === "node8") {
      if (choicesTaken.includes("b1") || choicesTaken.includes("b2") || choicesTaken.includes("b3") || choicesTaken.includes("b4") || choicesTaken.includes("b5") || choicesTaken.includes("b6")) {
        return "node9";
    }
  }
    if (currentNode === "node9") {
      if (choicesTaken.includes("b7")) {
        return "node8";
      } else if (choicesTaken.includes("b8")) {
        return "node9";
      } else if (choicesTaken.includes("b9")) {
        return "node9";
      } else if (choicesTaken.includes("b11")) {
        return "node10";
      }
    }
    if (currentNode === "node10") {
      if (choicesTaken.includes("c1")) {
        return "node10";
      } else if (choicesTaken.includes("c2")) {
        return "node10";
      } else if (choicesTaken.includes("c3")) {
        return "node10";
      }
    }
    return "start";
  },
  timeUntilDisaster: 1440,
  nodes: {
    "start": new NarrativeNode("start", "You just heard the news about the hurricane", "LivingRoom.png", [
      new Choice("a", "I don´t think the situation is that serious.", -5),
      new Choice("b", "I need to prepare my house!", 5),
      new Choice("c", "I need to evacuate!", 5),
    ]),
    "node4": new NarrativeNode("node4", "They say this every time and it always turns out to be fine", "LivingRoom.png", [
      new Choice("a1", "I should just ignore and continue my daily routine.", -5),
      new Choice("a2", "I should call someone to see what they say about this.", 5),
    ]),
    "node5": new NarrativeNode("node5", "The person says the situation is very serious, they are getting ready to evacuate", "LivingRoom.png", [
      new Choice("a3", "This is ridiculous, I will be fine everyone is just exaggerating. ", -10),
      new Choice("a4", "This is serious I will try to evacuate.", 10),
      new Choice("a5", "I will prepare my house.", 5),
    ]),
    "node6": new NarrativeNode("node6", "You went to sleep last night as if nothing happened, you are convinced that both you and your house will survive.Suddendly you hear a noise outside that catches your interest", "LivingRoom.png", [
      new Choice("a11", "You look outside the window.", 0),
      new Choice("a12", "You go back to sleep.", 0), /*bad ending*/
    ]),
    "node7": new NarrativeNode("node7", "You see the trees shaking and the winds are getting stronger, you underestimated this hurricane", "LivingRoom.png", [
      new Choice("a13", "You desperately try to prepare your house with the time you have left.", 10),
      new Choice("a14", "You hide in an indoor space in your house until the storm is over.", 0), /*bad ending*/
    ]),
    "node8": new NarrativeNode("node8", "After hearing the news you decide to prepare your house to make sure it is ready for the storm, what should you do first?", "LivingRoom.png", [
      new Choice("b1", "Place sandbags to block doorways and prevent flooding.", 10),
      new Choice("b2", "Barricade windows and doors", 10),
      new Choice("b3", "Move outdoor furniture and decorations inside", 10),
      new Choice("b4", "Stock up on food, water, batteries and other supplies", 10),
      new Choice("b5", "Prepare a safe room in your house", 10),
      new Choice("b6", "Move valuables to higher grounds", 10),
    ]),
    "node9": new NarrativeNode("node9", "You finished your previous task, what should you do next?", "LivingRoom.png", [
      new Choice("b7", "I should keep preparing the house", 10),/*goes back to node8*/
      new Choice("b8", "I am exhausted, I will distract myself a little", -5), /*goes back to node 9*/
      new Choice("b9", "I will go check on my neighbors/family members they might need help", 5), /*goes back to node 9*/
      new Choice("b10", "I think I did everything i had to do so now I will just wait", 0), /*sets timer to 0*/
      new Choice("b11", "I think I should evacuate now", 5),
    ]),
    "node10": new NarrativeNode("node10", "You decided to evacuate, is there anything you want to do before you evacuate?", "LivingRoom.png", [
      new Choice("c1", "Gather loved ones (family/pets/friends) to evacuate with you", 10),
      new Choice("c2", "Pack items to bring with you", 10), /*bad ending*/
      new Choice("c3", "Evacuate right away", -5),
    ]),
    "node11": new NarrativeNode("node11", "You will be away for sone time, so what items should you pack?", "LivingRoom.png", [
      new Choice("c21", "Change of clothes", 5),
      new Choice("c22", "Wallet and documents", 10), /*bad ending*/
      new Choice("c23", "Food and Water", 5),
      new Choice("c24", "First aid kit", 5),
      new Choice("c25", "Phone, computer and other eletronic devices", 10),
      new Choice("c26", "Important personal items", 5),
    ]),
    "node12": new NarrativeNode("node12", "You are ready to evacuate, where should you go?", "LivingRoom.png", [
      new Choice("c31", "Go to a shelter", 10),
      new Choice("c32", "Go to a hotel", 5),
      new Choice("c33", "Go to a friend's/family member's house", 5),
      new Choice("c34", "Drive to a different city", 10),
    ]),
  }
};

export default adventureStory;