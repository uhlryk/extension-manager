import Event from "./Event";
import EventData from "./EventData";
export default class Manager {
  constructor () {
    this._extensions = [];
    this._events = [];
  }

  registerExtension(newExtension) {
    if (this._extensions.some(extension => extension.getName() === newExtension.getName()) === false) {
      this._extensions.push(newExtension);
      newExtension.init(this);
    }
    return this;
  }

  getExtensions() {
    return this._extensions;
  }

  callEvent(eventName, value) {
    let event = this._events.find(event => event.getName() === eventName);
    const eventData = new EventData(value);
    if (event) {
      event.getCallbacks().forEach(callback => callback(eventData));
    }
    return eventData.getResponse();
  }

  registerEventListener(eventName, callback) {
    let event = this._events.find(event => event.getName() === eventName);
    if (!event) {
      event = new Event(eventName);
      this._events.push(event);
    }
    event.addCallback(callback);
    return this;
  }
}
