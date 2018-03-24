export default class Extension {
    constructor() {
        this._properties = {};
        this._events = {};
    }

    setProperty(propertyName, value) {
        this._properties[propertyName] = value;
        return this;
    }

    hasProperty(propertyName) {
        return this._properties.hasOwnProperty(propertyName);
    }

    getProperty(propertyName) {
        return this._properties[propertyName];
    }

    setEventListener(eventName, handler) {
        this._events[eventName] = handler;
        return this;
    }

    hasEventListener(eventName) {
        return this._events.hasOwnProperty(eventName);
    }

    getEventListener(eventName) {
        return this._events[eventName];
    }
}
