import Overload from "function-overloader";
import Extension from "./Extension";
import ExtensionJoint from "./ExtensionJoint";
import syncListCompose from "./compose/syncList";

export default class Manager {
    constructor() {
        this._extensionJoints = {};
    }

    registerExtension() {
        Overload.set(...arguments)
            .when(Overload.STRING, Overload.INSTANCE(Extension))
            .do((extensionName, extension) => {
                this._extensionJoints[extensionName] = new ExtensionJoint(extensionName, extension);
            })
            .when(Overload.STRING, Overload.OBJECT)
            .do((extensionName, { properties, events }) => {
                this._extensionJoints[extensionName] = new ExtensionJoint(
                    extensionName,
                    new Extension({
                        properties,
                        events
                    })
                );
            });
        return this;
    }

    getExtensionJoints(onlyActive = true) {
        return Object.values(this._extensionJoints).filter(
            extensionJoint => (onlyActive ? extensionJoint.isEnabled() : true)
        );
    }

    getExtensionJointsWithProperty(propertyName, onlyActive = true) {
        return this.getExtensionJoints(onlyActive).filter(extensionJoint =>
            extensionJoint.getExtension().hasProperty(propertyName)
        );
    }

    getExtensionJointsWithEventListener(eventName, onlyActive = true) {
        return this.getExtensionJoints(onlyActive).filter(extensionJoint =>
            extensionJoint.getExtension().hasEventListener(eventName)
        );
    }

    getPropertyValues(propertyName, onlyActive = true) {
        return this.getExtensionJointsWithProperty(propertyName, onlyActive).reduce(
            (response, extensionJoint) => {
                response[extensionJoint.getName()] = extensionJoint
                    .getExtension()
                    .getProperty(propertyName);
            },
            {}
        );
    }

    isExtensionJointEnabled(extensionName) {
        if (this.hasExtensionJoint(extensionName)) {
            return this._extensionJoints[extensionName].isEnabled();
        }
        return false;
    }

    disableExtensionJoint(extensionName) {
        if (this.hasExtensionJoint(extensionName)) {
            this._extensionJoints[extensionName].disable();
            return true;
        }
        return false;
    }

    enableExtensionJoint(extensionName) {
        if (this.hasExtensionJoint(extensionName)) {
            this._extensionJoints[extensionName].enable();
            return true;
        }
        return false;
    }

    hasExtensionJoint(extensionName) {
        return !!this._extensionJoints[extensionName];
    }

    getExtensionJoint(extensionName) {
        if (this.hasExtensionJoint(extensionName)) {
            return this._extensionJoints[extensionName];
        }
        return null;
    }

    createEvent(eventName, composeFunction = syncListCompose) {
        return value =>
            composeFunction(this.getExtensionJointsWithEventListener(eventName), eventName, value);
    }
}
