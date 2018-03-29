export default (extensions, eventName, value) =>
    extensions.map(extension => extension.getEventListener(eventName)(value));
