export default class Extension {
    constructor(data) {
        this._properties = (data && data.properties) || {};
        this._events = (data && data.events) || {};
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
