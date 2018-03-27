# EXTENSIONER
[![Build Status](https://travis-ci.org/uhlryk/extensioner.svg)](https://travis-ci.org/uhlryk/extensioner)
[![Downloads](https://img.shields.io/npm/dt/extensioner.svg)](https://www.npmjs.com/package/extensioner)
[![Downloads](https://img.shields.io/npm/dm/extensioner.svg)](https://www.npmjs.com/package/extensioner)
[![NPM version](https://img.shields.io/npm/v/extensioner.svg)](https://www.npmjs.com/package/extensioner)

## DESCRIPTION

Usually applications should be split into smaller logical parts called modules.
A problem appears when each module should be configured in multiple places. And when there is lot of different modules, configuring each of them separately became a challenge. 

This library is responsible for managing all app modules. You only initialize everything once and then just register and unregister new and old modules.

## EXAMPLE

In each module lets create init file

someCustomModuleA init file:

//modules/someCustomModuleA/index.js
```javascript
export default {
    properties: {
        customPropertyA: "customValueAA",
        customPropertyB: "customValueAB"
    },
    events: {
        customEventA: () => "customResponseFromEventAA",
        customEventB: () => "customResponseFromEventAB"
    }
}
```
As you can see this is just an object with properties : `properties` and `events`

someCustomModuleB init file:

//modules/someCustomModuleB/index.js
```javascript
import { Extension } from "extensioner";
export default class SomeCustomModuleB extends Extension{
    constructor(someInitOptions) {
        super();
        this.setProperty("customPropertyA", "customValueBA");
        this.setProperty("customPropertyC", "customValueBC");
        this.onCustomEventA = this.onCustomEventA.bind(this);
        this.setEventListener("customEventA", this.onCustomEventA);
        this.onCustomEventC = this.onCustomEventC.bind(this);
        this.setEventListener("customEventC", this.onCustomEventC);
    }
    onCustomEventA (initValue) {
        return "customResponseFromEventBA";
    }
    onCustomEventC (initValue) {
        return "customResponseFromEventBC";
    
    }
}
```
In above init file we created class which extends from `Extension`.

someCustomModuleC init file:

//modules/someCustomModuleC/index.js
```javascript
export default function someCustomModuleC(someInitOptions) {
    return {
        properties: {
            customPropertyB: "customValueBC",
            customPropertyC: "customValueCC"
        },
        events: {
            customEventB: () => "customResponseFromEventBC",
            customEventC: () => "customResponseFromEventCC"
        }
    }
}
```
In above init file we created function which will return extension object


Lets create manager instance and register modules

//index.js
```javascript
import { Manager } from "extensioner";
import someCustomModuleA from "./modules/someCustomModuleA/index.js";
import SomeCustomModuleB from "./modules/someCustomModuleB/index.js";
import someCustomModuleC from "./modules/someCustomModuleC/index.js";

const manager = new Manager();
manager
    .registerExtension("someCustomModuleNameA", someCustomModuleA)
    .registerExtension("someCustomModuleNameB", new SomeCustomModuleB())
    .registerExtension("someCustomModuleNameC", someCustomModuleC());
```

Lets prepare event and call it.

```javascript
const event = manager.createEvent("customEventA");

event()
    .then(responses => {
        /**
        *   responses is equal:
        *   [
        *       "customResponseFromEventAA",
        *       "customResponseFromEventBA"
        *   ]
        */
    });
```
It invoked in each listening module proper event handler.

Lets get property values from all modules

```javascript
manager.getExtensionsWithProperty("customPropertyA").forEach(extension => {
    extension.getProperty("customPropertyA")
})
```

## API

### new Manager(): manager
Creates new manager

### new Extension(): extension
Each module should have one root class with all settings and this class should extend Extension

### manager.registerExtension(extensionInstanceName: String, extension: Extension or Object): manager
Allow to register/add any new extension and return same manager instance.
Second argument can be instance of Extension class or just simple object with properties: `properties` and `events`

### manager.getExtensions([onlyActive = true]): Array<extension>
When `onlyActive` flag is true it will return all **active** extensions previously registered
When flag is false then it will return all extensions.

### manager.getExtensionsWithProperty(propertyName: String [, onlyActive = true]): Array<extensions>
When `onlyActive` flag is true it will return array of active extensions with specific property
When flag is false then it will return all extensions with specific property

### manager.getExtensionsWithEventListener(eventName: String) [, onlyActive = true]: Array<extensions>
When `onlyActive` flag is true it will return array of active extensions with specific event listener
When flag is false then it will return all extensions with specific event listener

### manager.isExtensionActive(extensionInstanceName: String): Boolean
Return true if extension with ext ensionInstanceName exist and is active. Otherwise false

### manager.hasExtension(extensionInstanceName: String): Boolean

Returns true if extension with extensionInstanceName exists.

### manager.disableExtension(extensionInstanceName: String): Boolean

Disable extension with undefinedextensionInstanceName name then it will return true. If extension doesn't exist it will return false

### manager.enableExtension(extensionInstanceName: String): Boolean

Enable extension with extensionInstanceName name then it will return true. If extension doesn't exist it will return false

### manager.getExtension(extensionInstanceName: String): extension
Return extension by its name or null if doesn't exist.

### manager.createEvent(eventName: String): Function
Create event function. Next step is to call this function to trigger event.
Response from triggering event return promise

```
    const event = manager.createEvent("onRenderHeader");
    event()
        .then(response => {
            //do something with responses
        })
```

## LICENSE

MIT



