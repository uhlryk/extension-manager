export default (extensionJoints, eventName, value) =>
    extensionJoints.reduce((response, extensionJoint) => {
        response[extensionJoint.getName()] = extensionJoint
            .getExtension()
            .getEventListener(eventName)(value);
    }, {});
