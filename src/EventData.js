export default class EventData {
  constructor (initValue) {
    this._initValue = initValue;
    this._response = [];
  }

  getValue () {
    return this._initValue;
  }

  addResponse (response) {
    this._response.push(response);
    return this;
  }

  getResponse() {
    return this._response;
  }
}
