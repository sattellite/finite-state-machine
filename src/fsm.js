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
    this.history = [];
    this.historyCursor = -1;
  }

  _addToHistory(state) {
    if (this.historyCursor !== (this.history.length - 1)) {
      this.history = this.history.splice(this.historyCursor, this.history.length);
    }
    this.history.push(state);
    this.historyCursor += 1;
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
  changeState(state) {
    if (!this.config.states[state]) {
      throw new Error('Undeclared state');
    }
    this.state = state;
    this._addToHistory(this.state);
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    if (!this.config.states[this.state].transitions[event]) {
      throw new Error('Unknown event for this state');
    }
    this.state = this.config.states[this.state].transitions[event];
    this._addToHistory(this.state);
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.state = this.config.initial;
    this._addToHistory(this.state);
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    if (!event || event === '') {
      return Object.keys(this.config.states);
    }

    return Object.keys(this.config.states).map((state) => {
      if (this.config.states[state].transitions[event]) {
        return state;
      }
    }).filter(Boolean);
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.historyCursor < 0) {
      return false;
    }
    this.historyCursor -= 1;
    if (this.history[this.historyCursor]) {
      this.state = this.history[this.historyCursor];
    } else {
      this.state = this.config.initial;
    }
    return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.historyCursor > (this.history.length - 2)) {
      return false;
    }
    this.historyCursor += 1;
    this.state = this.history[this.historyCursor];
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.history = [];
    this.historyCursor = -1;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka * */
