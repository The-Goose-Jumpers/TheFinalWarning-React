import NarrativeNode from "../NarrativeNode";
import { Scenes } from "../assets";

export const goodEnd= new NarrativeNode( //prepare and evacuate safely
    "goodend",
    "You took all the necessary precautions and evacuated safely."+
    " Despite the damage caused by the hurricane, you and your loved ones are safe,"+
    " and you feel a sense of relief knowing you made the right decisions.",
    Scenes.GoodEnding,
    []
  );

export const goodEnd1= new NarrativeNode( //evacuate safely
    "goodend1",
    "Even after all the inconviniences you were able to evacuate and you are now in a safe place."+
    " Despite the damage caused by the hurricane, you are safe,"+
    " and you feel a sense of relief knowing you made the right decisions.",
    Scenes.GoodEnding,
    []
  );
 
  export const badEndShortcut = new NarrativeNode(
    "badEndShortcut",
    "You decided to take a risky shortcut to escape the heavy traffic. The road, however, was poorly maintained and"+
    " quickly became impassable due to flooding and debris, leaving you trapped in a dangerous situation."+
    " The hurricane's force was too strong, and you were unable to find a safe route. Tragically, you and your loved ones did not survive.",
    Scenes.BadEnding,
    []
  );
  

  export const goodEndRoad = new NarrativeNode( // Successfully evacuates and reaches safety
    "goodEndRoad",
    "You managed to navigate the challenges on the road, including heavy traffic and potential fuel shortages."+
    " After hours of driving, you finally reach a safe location away from the hurricane's path. The feeling of "+ 
    " relief washes over you as you and your loved ones settle into a safe and secure environment.",
    Scenes.GoodEnding,
    []
  );
  
  export const badEndRoad = new NarrativeNode( // Fails to evacuate safely
    "badEndRoad",
    "Despite your efforts to evacuate, the situation took a turn for the worse. The heavy traffic delayed your escape,"+ 
    " and running low on fuel forced you to stop in an unsafe area. The hurricane's force was too strong, and the surrounding" + 
    " devastation left you stranded and vulnerable. Sadly, you and your loved ones faced ended up dying on the spot",
    Scenes.BadEnding,
    []
  );
  
  export const goodEndShelter = new NarrativeNode(
    "goodEndShelter",
    "You made your way to a well-prepared community shelter. The staff there ensured everyone was safe and accounted for."+
     " While the hurricane caused significant destruction, you and those around you were secure."+
     " Relief fills you as you wait for the storm to pass in safety.",
    Scenes.GoodEnding,
    []
  );
  
  export const goodEndHotel = new NarrativeNode(
    "goodEndHotel",
    "You managed to secure a room at a sturdy hotel outside the storm's immediate path. The staff provided food and shelter,"+
    " and you felt reassured knowing you were safe. Though the hurricane left widespread damage, you escaped unharmed and grateful"+
    " for your quick thinking.",
    Scenes.GoodEnding,
    []
  );
  
  export const goodEndFriendsHouse = new NarrativeNode(
    "goodEndFriendsHouse",
    "You arrived at your friend's/family member's house just in time. They had prepared their home to weather the storm, and you"+
    " worked together to stay safe. Though the hurricane was fierce, you emerged unscathed, knowing that teamwork and preparation made"+
    " all the difference.",
    Scenes.GoodEnding,
    []
  );
  