export default (extensionJoints, eventName, value) =>
    extensionJoints.map(extensionJoint =>
        extensionJoint.getExtension().getEventListener(eventName)(value)
    );
