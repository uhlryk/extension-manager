import Promise from "bluebird";

export default (extensionJoints, eventName, value) =>
    Promise.props(
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
        )
    );
