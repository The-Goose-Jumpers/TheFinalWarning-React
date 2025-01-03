
class Choice {

  constructor(id, text, scoreChange = 0, timeUsed = 0, resetTime = false) {
    this.id = id;
    this.text = text;
    this.scoreChange = scoreChange;
    this.timeUsed = timeUsed;
    this.resetTime = resetTime;
  }

  getScore(playerTraits) {
    let finalScore = this.scoreChange;

/*     // Example scoring logic based on traits
    if (playerTraits.hasChildren) {
      finalScore += 5; // Increase score if player has children
    }
    if (playerTraits.hasPets) {
      finalScore += 2; // Increase score if player has pets
    }
    if (playerTraits.hasCar) {
      finalScore += 3; // Increase score if player has a car
    } */

    return finalScore;
  }
}

export default Choice;
  