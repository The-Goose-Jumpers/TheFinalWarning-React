import NarrativeNode from "../NarrativeNode";
import Choice from "../Choice";
import {any} from "../../utils/arrayUtils";
import {Scenes} from "../assets";

const hurricane1 = {
  id: "hurricane1",
  determineNextNode: (currentNode, choicesTaken) => {
    if (currentNode === "start") {
      if (choicesTaken.includes("a")) {
        return "node4";
      }
        else if (any(choicesTaken, "f", "e")) {
        return "node3";
      }
    }
    if (currentNode === "node3") {
      if (choicesTaken.includes("b")) {
        return "node8";
      } else if (choicesTaken.includes("c")) {
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
      else if (choicesTaken.includes("a12")) {
        return "badend";
      }
    }
    if (currentNode === "node7") {
      if (choicesTaken.includes("a13")) {
        return "node8";
      }
    }
    if (currentNode === "node8") {
      if (choicesTaken.includes("b0") ||
        choicesTaken.includes("b1") ||
        choicesTaken.includes("b2") ||
        choicesTaken.includes("b3") ||
        choicesTaken.includes("b4") ||
        choicesTaken.includes("b5") ||
        choicesTaken.includes("b6")) {
        return "node9";
      }
    }

    if (currentNode === "node9") {
      if (choicesTaken.includes("b7")) {
        return "node8";
      } else if (choicesTaken.includes("b8")) {
        return "node9.1";
      } else if (choicesTaken.includes("b9")) {
        return "node9.2";
      } else if (choicesTaken.includes("b10")) {
        return "hurri1";
      } else if (choicesTaken.includes("b11")) {
        return "node10";
      }
    }
    if (currentNode === "node9.1") {
      if (choicesTaken.includes("b12")) {
        return "node8";
      } else if (choicesTaken.includes("b13")) {
        return "node9.2";
      } else if (choicesTaken.includes("b14")) {
        return "hurri1";
      } else if (choicesTaken.includes("b15")) {
        return "node10";
      }
    }
    if (currentNode === "node9.2") {
      if (choicesTaken.includes("b16")) {
        return "node8";
      } else if (choicesTaken.includes("b17")) {
        return "node9.1";
      } else if (choicesTaken.includes("b18")) {
        return "hurri1";
      } else if (choicesTaken.includes("b19")) {
        return "node10";
      }
    }

    if (currentNode === "node10") {
      if (choicesTaken.includes("c1")) {
        return "node11";
      } else if (choicesTaken.includes("c2")) {
        return "node12";
      } else if (choicesTaken.includes("c3")) {
        return "node13";
      }
    }
    if (currentNode === "node11") {
      if (choicesTaken.includes("c11")) {
        return "node13";
      } else if (choicesTaken.includes("c12")) {
        return "node13";
      } else if (choicesTaken.includes("c13")) {
        return "node9";
      } else if (choicesTaken.includes("c14")) {
        return "bademd";
      }
    }
    if (currentNode === "node12" && any(choicesTaken, "c21", "c22", "c23", "c24", "c25", "c26")) {
      return "node13";
    }
    if(currentNode === "node13") {
      if(choicesTaken.includes("c31") ||
         choicesTaken.includes("c32") ||
         choicesTaken.includes("c33") ||
         choicesTaken.includes("c34") ||
         choicesTaken.includes("c35")) {
        return "end";
      }
    }
    return "start";
  },
  timeUntilDisaster: 2880,
  nodes: {
    "start": new NarrativeNode("start",
        "You just heard the news about the category 4 hurricane that will be reaching your area in 2 days."+
        "In the map it says that you are in an evacuation area, each means it might be dangerous to stay"+
        " It's currently midnight, you were about to go to sleep, what will you do now?",
        Scenes.LivingRoom,
        [
        new Choice("a", "I don't think the situation is that serious,"+
          " I will just go to sleep for now", -5,600),
        new Choice("e", "I will go to sleep and start preparing tomorrow ", 5,600),
        new Choice("f", "I need to start the preparations right now"+
          " and evacuate as soon as possible", 10,20),
    ]),
      "node3": new NarrativeNode("node3","You are ready to prepare for the hurricane, what should you do first?",
        Scenes.LivingRoom,
        [
        new Choice("b", "I need to prepare my house!", 5,20),
        new Choice("c", "I have to evacuate!", 5,60),
    ]),
    "node4": new NarrativeNode("node4",
        "They say this every time and it always turns out to be fine",
        Scenes.LivingRoom,
        [
        new Choice("a1", "I should just ignore and continue my daily routine.", -5,),
        new Choice("a2", "I should call someone to see what they say about this.", 5,20),
    ]),
    "node5": new NarrativeNode("node5",
        "The person says the situation is very serious, they are getting ready to evacuate",
        Scenes.LivingRoom,
        [
        new Choice("a3", "This is ridiculous, I will be fine everyone is just exaggerating. ", -10,600),
        new Choice("a4", "This is serious I will try to evacuate.", 10,0),
        new Choice("a5", "I will prepare my house.", 5,0),
    ]),
    "node6": new NarrativeNode("node6",
        "Almost one day has passed since you first heard the news," +
        "you just got back from work your, you sit on the couch and put on your fav show" +
        "Suddenly you hear a noise outside that catches your interest",
        Scenes.LivingRoom,
        [
        new Choice("a11", "I will go outside to check what is going on", 0,5),
        new Choice("a12", "It's probably just heavy rain I will be fine",-10,0,true), /*bad ending*/
     ]),
    "node7": new NarrativeNode("node7",
        "You see the trees shaking and the winds are getting stronger," +
        " you underestimated this hurricane",
        Scenes.LivingRoom,
        [
        new Choice("a13", "Oh no, I need to prepare my house, I don't have time to evacuate!"+ 10,0),
        new Choice("a14", "When the hurricane arraives, I will just hide in my inside room.", 0,0,true), 
        new Choice("a15", "I will still try to evacuate!", 5,5),
    ]),
    "node8": new NarrativeNode("node8",
        "There are certain things that should be done around the house to ensure that," +
        " both you and your property will stay safe during the hurricane, what should you do first?",
        Scenes.LivingRoom,
        [
        new Choice("b0", "Fill the bathtub with water", 5,30),
        new Choice("b1", "Place sandbags to block doorways and prevent flooding.", 5,120),
        new Choice("b2", "Barricade windows and doors", 10,120),
        new Choice("b3", "Move outdoor furniture and decorations inside", 10,120),
        new Choice("b4", "Stock up on food, water, batteries and other supplies", 15,180),
        new Choice("b5", "Prepare a safe room in your house", 5,60),
        new Choice("b6", "Move valuables to higher grounds", 10,60),
    ]),
    "node9": new NarrativeNode("node9","You finished preparing your house, you are exausted and need a break, what should you do next?",
        Scenes.LivingRoom,
        [
        new Choice("b7", "I should keep preparing the house", 10,0),/*goes back to node8*/
        new Choice("b8", "I am exhausted, I will distract myself a little", -5,300), /*goes back to node 9*/
        new Choice("b9", "I will go check on my neighbors/family members, they might need help", 5,180), /*goes back to node 9*/
        new Choice("b10", "I think I did everything i had to do so now I will just wait", 0,0,true), /*sets timer to 0*/
        new Choice("b11", "I think I should evacuate now", 10,0),
    ]),
    "node9.1": new NarrativeNode("node9.1","You decided to do one of your favorite activities to get some rest and relax"+
        "You are now feeling less stressed, but time flies it's been 5 hours, what should you do now?",
      Scenes.LivingRoom,
      [
      new Choice("b12", "I should keep preparing the house", 10,0),/*goes back to node8*/
      new Choice("b13", "I will go check on my neighbors/family members, they might need help", 5,120), /*goes back to node 9*/
      new Choice("b14", "I think I did everything i had to do so now I will just wait", 0,0,true), /*sets timer to 0*/
      new Choice("b15", "I think I should evacuate now", 10,0),
  ]),
    "node9.2": new NarrativeNode("node9.2", 
        "You decide to check on your neighbors and family members. Some of them need help securing their homes, and you spend a few hours assisting them." + 
        " While you feel good about helping others, the hurricane is getting closer. What should you do now?",
        Scenes.Outside,
        [
            new Choice("b16", "I should keep preparing the house", 10, 0), /*goes back to node8*/
            new Choice("b17", "I am exhausted, I will distract myself a little", -5, 300), /*goes to node9.1*/
            new Choice("b18", "I think I did everything I had to do so now I will just wait", 0, 0, true), /*sets timer to 0*/
            new Choice("b19", "I think I should evacuate now", 10, 0),
        ]
    ),
    "node10": new NarrativeNode("node10",
        "You decided to evacuate, is there anything you want to do before you evacuate?",
        Scenes.LivingRoom,
        [
        new Choice("c1", "Gather loved ones to evacuate with you", 10,120), /*goes to node13*/
        new Choice("c2", "Pack items to bring with you", 10,0),
        new Choice("c3", "Evacuate right away", -5,0),
    ]),
    "node11": new NarrativeNode("node11", "You have gathered everyone and are ready to evacuate," +
        " but you remember some hotels and shelters don't accept pets, what should you do?",
      Scenes.Outside,
    [
      new Choice("c11", "I will have to leave them behind", -5,0),
      new Choice("c12", "I will take them with me anyways!", 10,0),
      new Choice("c13", "If I can't take all of my pets"+"then i am not going anywhere I will stay home ", 5,0), 
    ]),
    "node12": new NarrativeNode("node12", "You will be away for some time, so what items should you pack?",
      Scenes.LivingRoom,
      [
        new Choice("c21", "Change of clothes", 5, 20),
        new Choice("c22", "Wallet and documents", 10, 10),
        new Choice("c23", "Food and Water", 5, 20),
        new Choice("c24", "First aid kit", 5, 10),
        new Choice("c25", "Phone, computer and other electronic devices", 10, 10),
        new Choice("c26", "Important personal items", 5, 30),
      ], true),
    "node13": new NarrativeNode("node13", "You are ready to evacuate, where should you go?",
        Scenes.Outside,
        [
        new Choice("c31", "Go to a shelter", 10,0),
        new Choice("c32", "Go to a hotel", 5,0),
        new Choice("c33", "Go to a friend's/family member's house", 5,0),
        new Choice("c34", "Drive to a different city", 10,0),
        new Choice("c35", "Go to a gas station to fill your car's gas tank", 5,180),
    ]),
// Hurricane Event Nodes
    "nodeHurri1": new NarrativeNode("nodeHurri1","The hurricane has arrived. The sky is dark, and the howling winds shake"+
    " the very foundation of your house. Debris flies past your windows, and the power flickers ominously."+
    " You realize this is a critical moment—your actions now could mean the difference between survival and disaster.",
    Scenes.Outside,
    [
      new Choice("h", "Distract yourself and hope for the best.", -10, 0), 
      new Choice("h0", "Step outside to take pictures of the storm to post online.", -20, 0), 
      new Choice("h1", "Find shelter in an interior room with no windows.", 10, 0), 
      new Choice("h2", "Quickly shut off the gas and electricity.", 15, 0), //goes to nodeHurri2
      new Choice("h3", "Try to control the flooding inside the house.", 20, 0), //goes to nodeHurri3
    ]
  ),
  "nodeHurri2": new NarrativeNode("nodeHurri1","You rush to turn off the gas and electricity,"+
    "reducing the risk of fires or electrical hazards. The house goes silent except for the storm’s roar.",
    Scenes.Outside,
    [
      new Choice("h4", "Distract yourself and hope for the best.", -10, 0), 
      new Choice("h5", "Step outside to take pictures of the storm to post online", -20, 0), 
      new Choice("h6", "Find shelter in an interior room with no windows.", 10, 0), 
      new Choice("h7", "Try to control the flooding inside the house.", 20, 0), 
    ]
  ),

      "goodend": new NarrativeNode("goodend", "You have survived the hurricane",),
      "badend": new NarrativeNode("badend", "You have died in the hurricane.",),
    }
    
  };

export default hurricane1;
