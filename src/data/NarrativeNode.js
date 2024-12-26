/**
 * Represents a single narrative node in the game.
 */
class NarrativeNode {
  /**
   * @param {string} id - The node's unique ID
   * @param {string} dialogue - The dialogue for this node
   * @param {string} backgroundImage - The background image URL
   * @param {Choice[]} choices - The available choices for the player
   * @param {boolean} allowMultipleChoices - Whether multiple choices can be selected
   */
  constructor(id, dialogue, backgroundImage, choices, allowMultipleChoices = false) {
    this.id = id;
    this.dialogue = dialogue;
    this.backgroundImage = backgroundImage;
    this.choices = choices;
    this.allowMultipleChoices = allowMultipleChoices;
  }
}

export default NarrativeNode;
