import Promise from "bluebird";

export default (extensions, eventName, value) =>
    Promise.all(extensions.map(extension => extension.getEventListener(eventName)(value)));
