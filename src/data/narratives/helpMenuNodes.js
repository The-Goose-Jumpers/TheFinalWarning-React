import NarrativeNode from "../NarrativeNode";
import { HelpMenu } from "../assets";

const helpMenuNodes = {
  start: new NarrativeNode(
    "start",
    "This game is a hurricane survival simulator, where your choices will define"+
    " your fate during a deadly hurricane. You will have to make quick decisions to ensure your safety and survival. ",
    null,
    [{ id: "next", label: "▷", target: "node1" }]
  ),
  node1: new NarrativeNode(
    "node1",
    "Like in real life, you will have limited time to prepare before the disaster strikes.",
    HelpMenu.Node1,
    [
      { id: "prev", label: "◁", target: "start" },
      { id: "next", label: "▷", target: "node11" },
    ]
  ),
  node11: new NarrativeNode(
    "node11",
    "Most actions will cost you time, so use your time wisely or else the hurricane "+
    " might get to you make all the preparations you needed!",
    HelpMenu.Node2,
    [
      { id: "prev", label: "◁", target: "node1" },
      { id: "next", label: "▷", target: "node2" },
    ]

  ),
  node2: new NarrativeNode(
    "node2",
    "The score that will be calculated based on your decisions and actions. Each choice you make  "+
    " will affect your score depending on how correct your action was during that situation. ",
    null,
    [
      { id: "prev", label: "◁", target: "node1" },
      { id: "next", label: "▷", target: "node3" },
    ]
  ),
  node3: new NarrativeNode(
    "node3",
    "Keep in mind that you are not playing as yourself, you are playing as a character, so when you make a decision you have to remember "+
    " the character's needs and worries. If you do so, you will get bonus poits, and if choose to ignore those you will lose points.",
    null,
    [
      { id: "prev", label: "◁", target: "node2" },
      { id: "next", label: "▷", target: "node4" },
    ]
  ),
 node4: new NarrativeNode(
    "node4",
    "You can view the worries of your character after pulling the handle under the Time Until Disaster area on the top of the screen",
    HelpMenu.Node4,
    [
    { id: "prev", label: "◁", target: "node3" },
    { id: "next", label: "▷", target: "node5" },
    ]
 ),
 node5: new NarrativeNode(
    "node5",
    "Your score will be shown once you reach an ending.",
    HelpMenu.Node5,
    [
    { id: "prev", label: "◁", target: "node4" },
    { id: "next", label: "▷", target: "node6" },
    ]
 ),
 node6: new NarrativeNode(
    "node6",
    "You can submit your score and you might get a place on the Top 10 scores if it is high enought!",
    HelpMenu.Node6,
    [
    { id: "prev", label: "◁", target: "node5" },
    { id: "next", label: "▷", target: "node7" },
    ]
 ),
 node7: new NarrativeNode(
    "node7",
    "On the main menu you can click on scoreboad and check your best score along with your last 5 scores."+
    " All of your scores will be saved automatically after you finish the game, without the need to submit them."+
    " But remember that if you want your score in the Top 10 you will have to submit it!",
    HelpMenu.Node7,
    [
    { id: "prev", label: "◁", target: "node6" },
    { id: "next", label: "▷", target: "node8" },
    ]
 ),
  node8: new NarrativeNode(
  "node8",
  "To check the Rankings, click on the Rankings button after entering the scoreboard menu. "+
  " Here you will be able to see the top 10 scores of all time.",
  HelpMenu.Node8,
  [
  { id: "prev", label: "◁", target: "node7" },
  { id: "next", label: "▷", target: "node9" },
  ]
),
node9: new NarrativeNode(
    "node9",
    "That's all you need to know, remember to make the best decisions to ensure your survival during the hurricane!",
    null,
    [
    { id: "prev", label: "◁", target: "node8" },
    { id: "close", label: "Close", target: "close" },
    ]
)
};

export default helpMenuNodes;
