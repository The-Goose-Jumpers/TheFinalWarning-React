/**
 * @typedef {Object} Choice
 * @property {string} id - Unique identifier for the choice
 * @property {string} text - The text that describes the choice
 * @property {number} scoreChange - The base score change for this choice
 */

/**
 * Represents a choice made by the player.
 */
class Choice {
  /**
   * @param {string} id - The unique ID for this choice
   * @param {string} text - The text describing the choice
   * @param {number} scoreChange - The score change associated with this choice
   */
  constructor(id, text, scoreChange = 0) {
    this.id = id;
    this.text = text;
    this.scoreChange = scoreChange;
  }

  /**
   * Calculates the score change based on the player's traits
   * @param {PlayerTraits} playerTraits - The player's current traits
   * @returns {number} - The final score change after factoring in traits
   */
  getScore(playerTraits) {
    let finalScore = this.scoreChange;

    // Example scoring logic based on traits
    if (playerTraits.hasChildren) {
      finalScore += 5; // Increase score if player has children
    }
    if (playerTraits.hasPets) {
      finalScore += 2; // Increase score if player has pets
    }
    if (playerTraits.hasCar) {
      finalScore += 3; // Increase score if player has a car
    }

    return finalScore;
  }
}

export default Choice;
  