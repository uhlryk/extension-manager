import Promise from "bluebird";

export default (extensionJoints, eventName, value) =>
    Promise.all(
        extensionJoints.map(extensionJoint =>
            extensionJoint.getExtension().getEventListener(eventName)(value)
        )
    );
