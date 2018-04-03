export default (extensionJoints, eventName, value) =>
    extensionJoints.reduce(
        (response, extensionJoint) =>
            Object.assign(
                {
                    [extensionJoint.getName()]: extensionJoint
                        .getExtension()
                        .getEventListener(eventName)(value)
                },
                response
            ),
        {}
    );
