export default class Event {
  private _name: String;
  private _callbacks: Function[];
  constructor (name: String) {
    this._name = name;
    this._callbacks = [];
  }

  getName (): String {
    return this._name;
  }

  addCallback (callback: Function): Event {
    this._callbacks.push(callback);
    return this;
  }

  getCallbacks(): Function[] {
    return this._callbacks;
  }
}
