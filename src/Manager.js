export default class Manager {
    constructor() {
        this._extensions = {};
    }

    registerExtension(extensionName, extension) {
        this._extensions[extensionName] = extension;
        return this;
    }

    getExtensions() {
        return Object.values(this._extensions);
    }

    getExtensionByName(extensionName) {
        return this._extensions[extensionName];
    }

    callEvent(eventName, value) {
        return this.getExtensions()
            .filter(extension => extension.hasEventListener(eventName))
            .map(extension => extension.getEventListener(eventName)(value));
    }
}
