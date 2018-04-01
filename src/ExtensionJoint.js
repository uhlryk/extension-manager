export default class ExtensionJoint {
    constructor(name, extension, manager) {
        this._name = name;
        this._extension = extension;
        this._enabled = true;
        this._manager = manager;
    }
    isEnabled() {
        return this._enabled;
    }

    enable() {
        this._enabled = true;
    }

    disable() {
        this._enabled = false;
    }

    getExtension() {
        return this._extension;
    }

    getName() {
        return this._name;
    }

    getManager() {
        return this._manager;
    }
}
