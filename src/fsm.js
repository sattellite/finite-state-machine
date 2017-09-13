/**
 * @typedef {object} FSMConfig
 * @property {string} initial - initial state for FSM
 * @property {Object.<string, object>} states - description for all possible states of FSM
 */
class FSM {
  /**
   * Creates new FSM instance.
   * @param {FSMConfig} config
   */
  constructor(config) {
    if (!config) {
      throw new Error('Cannot create new instance without config');
    }
    this.state = config.initial;
    this.config = config;
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.state;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {}

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {}

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.state = this.config.initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {}

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {}

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {}

  /**
   * Clears transition history
   */
  clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka * */
