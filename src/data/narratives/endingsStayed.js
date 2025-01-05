import NarrativeNode from "../NarrativeNode";
import { Scenes } from "../assets";

export const badEnd = new NarrativeNode( //ignores the warning
  "badEnd",
  "The hurricane's intensity caught you off guard. Unfortunately,"+ 
  " your decisions left you unprepared, and your house ended up being destroyed by the storm."+
  " Both you and your loved ones perashied in the storm.",
  Scenes.BadEndStay,
  []
); 
  export const goodEndDistract = new NarrativeNode( //distract and did ALL THE PREPARATIONS 
    "goodEndDistact",
    "You sit down and try to distract yourself from the chaos outside."+
    " The relentless roar of the hurricane fills the room, but you convince yourself that staying calm is the best option."+
    " Fortunetly all the preparations were enough for the house to stay steady and not be severely damaged."+
    " You and your loved ones are safe, and you feel a sense of relief knowing you made the right decisions.",
    Scenes.Outside,
    []
  );

  export const badEndDistract= new NarrativeNode( //distract and didn´t do  barricade windows and moved valuables
    "badEndDistract",
    "You sit down and try to distract yourself from the chaos outside."+
    " The relentless roar of the hurricane fills the room, but you convince yourself that staying calm is the best option."+
    " Even tho you made some preparations, it wasn't enough to fully avoid the impact of the hurricane."+
    " The hurricane's intensity caught you off guard, and your house ended up being destroyed by the storm.",
    Scenes.BadEndStay,
    []
  );

  export const badEndPictures = new NarrativeNode(
    "nodeOutside",
    "You step outside with your phone, eager to capture the storm. The winds are far stronger than you imagined,"+
    "and debris whirls dangerously around you. You end up being cought by the storm, a heavy object comes flying towards you."+
    " You try to dodge it, but it hits you and you end up dying on the spotS"+
    Scenes.BadEndStay,
    []
);
// Good and Bad Endings for "Find shelter in an interior room with no windows"
export const goodEndInterior = new NarrativeNode(
    "goodEndInterior",
    "You take shelter in a windowless interior room, where you are protected from flying debris and the worst of the storm."+
    " Your precautions pay off, and you and your family remain safe until the hurricane passes.",
    Scenes.Outside,
    []
  );
  
  export const badEndInterior = new NarrativeNode("badEndInterior",
    "You find shelter in an interior room, but rising floodwaters seep in faster than you anticipated. "+
    " Despite your efforts to stay safe,the flooding ends up compromising the room's",+
    "leaving you stuck and with no way out, you end up dying.",
    Scenes.BadEndStay,
    []
  );
  
  // Good and Bad Endings for "Try to control the flooding inside the house"
  export const goodEndFlood = new NarrativeNode(
    "goodEndFlood",
    "You work tirelessly to redirect and manage the rising water inside your house. Though exhausting,"+
    " your efforts keep the flooding from causing severe damange"+
    " Despite the damage caused by the hurricane, you are safe,"+
    " and you feel a sense of relief knowing you made the right decisions.",
    Scenes.GoodEndFlood,
    []
  );
  
  export const badEndFlood = new NarrativeNode( //
    "badEndFlood", 
    "Despite your best efforts to control the flooding, the water level rises uncontrollably, overwhelming your home."+
    "You find yourself trapped inside as the water reache s the ceiling, forcing you to climb to precarious higher ground"+
    " through a window. Your house is completely destroyed, and you narrowly escape with your life",
    Scenes.BadEndFlood,
    []
  );
  
  
