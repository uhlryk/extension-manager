import Promise from "bluebird";

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

    getExtensionsWithProperty(propertyName) {
        return Object.values(this._extensions).filter(extension => extension.hasProperty(propertyName));
    }

    getExtensionsWithEventListener(eventName) {
        return Object.values(this._extensions).filter(extension => extension.hasEventListener(eventName));
    }

    getExtensionByName(extensionName) {
        return this._extensions[extensionName];
    }

    createEvent(eventName) {
        return value =>
            Promise.all(
                this.getExtensionsWithEventListener(eventName).map(extension =>
                    extension.getEventListener(eventName)(value)
                )
            );
    }
}
