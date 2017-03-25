import Manager from "./Manager";
export default class Extension {
  private _manager: Manager;
  private _name: String;
  constructor (name: String) {
    this._manager = null;
    this._name = name;
  }

  init (manager: Manager): Extension {
    this._manager = manager;
    return this;
  }

  getManager (): Manager {
    return this._manager;
  }

  getName (): String {
    return this._name;
  }
}
