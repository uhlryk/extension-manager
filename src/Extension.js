export default class Extension {
  constructor () {
    this._manager = null;
    this._name = null;
  }

  init (manager) {
    this._manager = manager;
    return this;
  }

  getManager () {
    return this._manager;
  }

  setName (name) {
    this._name = name;
  }

  getName () {
    return this._name;
  }
}
