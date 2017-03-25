import Extension from "./Extension";
import Event from "./Event";
export default class Manager {
  private _extensions: Extension[];
  private _events: Event[];
  constructor () {
    this._extensions = [];
    this._events = [];
  }

  registerExtension(newExtension: Extension): Manager {
    if (this._extensions.some(extension => extension.getName() === newExtension.getName()) === false) {
      this._extensions.push(newExtension);
      newExtension.init(this);
    }
    return this;
  }

  callEvent(eventName: String, props: any): any[] {
    let callbackResponses: any[] = [];
    let event: Event = this._events.find(event => event.getName() === eventName);
    if (event) {
      callbackResponses.push(event.getCallbacks().forEach(callback => callback(props)));
    }
    return callbackResponses;
  }

  registerEventListener(eventName: String, callback: Function) : Manager {
    let event: Event = this._events.find(event => event.getName() === eventName);
    if (!event) {
      event = new Event(eventName);
      this._events.push(event);
    }
    event.addCallback(callback);
    return this;
  }
}
