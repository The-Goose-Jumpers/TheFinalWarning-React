/**
 * @typedef {Object} NarrativeNode
 * @property {string} id - The unique identifier for this node
 * @property {string} dialogue - The dialogue for this node
 * @property {string} backgroundImage - The background image URL
 * @property {Choice[]} choices - An array of choices for the player
 */

/**
 * Represents a single narrative node in the game.
 */
class NarrativeNode {
  /**
   * @param {string} id - The node's unique ID
   * @param {string} dialogue - The dialogue for this node
   * @param {string} backgroundImage - The background image URL
   * @param {Choice[]} choices - The available choices for the player
   */
  constructor(id, dialogue, backgroundImage, choices) {
    this.id = id;
    this.dialogue = dialogue;
    this.backgroundImage = backgroundImage;
    this.choices = choices;
  }
}

export default NarrativeNode;
