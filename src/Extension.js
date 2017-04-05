import Manager from "./Manager";
export default class Extension {
  constructor (name) {
    this._manager = null;
    this._name = name;
  }

  init (manager) {
    this._manager = manager;
    return this;
  }

  getManager () {
    return this._manager;
  }

  getName () {
    return this._name;
  }
}
