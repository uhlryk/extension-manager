export default class Event {
  constructor (name) {
    this._name = name;
    this._callbacks = [];
  }

  getName () {
    return this._name;
  }

  addCallback (callback) {
    this._callbacks.push(callback);
    return this;
  }

  getCallbacks() {
    return this._callbacks;
  }
}
