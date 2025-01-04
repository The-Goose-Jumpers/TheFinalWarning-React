import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function addScore(playerName, score) {
    try {
    const today = new Date().toLocaleDateString(); 
      await addDoc(collection(db, "rankings"), {
        name: playerName,
        score,
        date: today
      });
      return true;
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      return false;
    }
  }
  
