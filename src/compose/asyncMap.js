import Promise from "bluebird";

export default (extensionJoints, eventName, value) =>
    Promise.props(
        extensionJoints.reduce((response, extensionJoint) => {
            response[extensionJoint.getName()] = extensionJoint
                .getExtension()
                .getEventListener(eventName)(value);
            return response;
        }, {})
    );
