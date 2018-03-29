import Overload from "function-overloader";
import Extension from "./Extension";
import syncListCompose from "./compose/syncList";

export default class Manager {
    constructor() {
        this._extensions = {};
    }

    registerExtension() {
        Overload.set(...arguments)
            .when(Overload.STRING, Overload.INSTANCE(Extension))
            .do((extensionName, extension) => {
                this._extensions[extensionName] = { extension, enabled: true };
            })
            .when(Overload.STRING, Overload.OBJECT)
            .do((extensionName, { properties, events }) => {
                this._extensions[extensionName] = {
                    extension: new Extension({
                        properties,
                        events
                    }),
                    enabled: true
                };
            });
        return this;
    }

    getExtensions(onlyActive = true) {
        return Object.values(this._extensions)
            .filter(extensionData => (onlyActive ? extensionData.enabled : true))
            .map(extensionData => extensionData.extension);
    }

    getExtensionsWithProperty(propertyName, onlyActive = true) {
        return this.getExtensions(onlyActive).filter(extension => extension.hasProperty(propertyName));
    }

    getExtensionsWithEventListener(eventName, onlyActive = true) {
        return this.getExtensions(onlyActive).filter(extension => extension.hasEventListener(eventName));
    }

    isExtensionActive(extensionName) {
        if (this.hasExtension(extensionName)) {
            return this._extensions[extensionName].enabled;
        }
        return false;
    }

    disableExtension(extensionName) {
        if (this.hasExtension(extensionName)) {
            this._extensions[extensionName].enabled = false;
            return true;
        }
        return false;
    }

    enableExtension(extensionName) {
        if (this.hasExtension(extensionName)) {
            this._extensions[extensionName].enabled = true;
            return true;
        }
        return false;
    }

    hasExtension(extensionName) {
        return !!this._extensions[extensionName];
    }

    getExtension(extensionName) {
        if (this.hasExtension(extensionName)) {
            return this._extensions[extensionName].extension;
        }
        return null;
    }

    createEvent(eventName, composeFunction = syncListCompose) {
        return value => composeFunction(this.getExtensionsWithEventListener(eventName), eventName, value);
    }
}
