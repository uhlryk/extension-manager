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
            customEventB: () => "customResponseFromEventCB",
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

const responses = event();
/**
*   responses is equal:
*   [
*       "customResponseFromEventAA",
*       "customResponseFromEventBA"
*   ]
*/
```

Lets prepare event with async event resolver
```javascript
import { asyncListCompose } from "extensioner";
const event = manager.createEvent("customEventB", asyncListCompose);

event()
    .then(responses => {
        /**
        *   responses is equal:
        *   [
        *       "customResponseFromEventAB",
        *       "customResponseFromEventCB"
        *   ]
        */
    });
```

Lets get property values from all modules

```javascript
manager.getExtensionsWithProperty("customPropertyA").forEach(extension => {
    extension.getProperty("customPropertyA")
})
```

## API

### Manager component

#### new Manager(): manager
Creates new manager

#### new Extension(): extension
Each module should have one root class with all settings and this class should extend Extension

#### manager.registerExtension(extensionInstanceName: String, extension: Extension): manager
Allow to register/add any new extension and return same manager instance.
Second argument can be instance of Extension class

OR

#### manager.registerExtension(extensionInstanceName: String, extension: Object): manager
Allow to register/add any new extension and return same manager instance.
Second argument is simple object with properties: `properties` and `events`

#### manager.getExtensionJoints([onlyActive = true]): Array<ExtensionJoint>
When `onlyActive` flag is true it will return all **active** extensions joints for previously registered extensions
When flag is false then it will return all extensions.

#### manager.getExtensionJointsWithProperty(propertyName: String [, onlyActive = true]): Array<ExtensionJoint>
When `onlyActive` flag is true it will return array of active extension joints with specific property
When flag is false then it will return all extensions with specific property

#### manager.getExtensionJointsWithEventListener(eventName: String) [, onlyActive = true]): Array<ExtensionJoints>
When `onlyActive` flag is true it will return array of active extension joints with specific event listener
When flag is false then it will return all extensions with specific event listener

#### manager.isExtensionJointEnabled(extensionInstanceName: String): Boolean
Return true if extension with ext ensionInstanceName exist and is active. Otherwise false

#### manager.hasExtensionJoint(extensionInstanceName: String): Boolean

Returns true if extension with extensionInstanceName exists.

#### manager.disableExtensionJoint(extensionInstanceName: String): Boolean

Disable extension with undefinedextensionInstanceName name then it will return true. If extension doesn't exist it will return false

#### manager.enableExtensionJoint(extensionInstanceName: String): Boolean

Enable extension with extensionInstanceName name then it will return true. If extension doesn't exist it will return false

#### manager.getExtensionJoint(extensionInstanceName: String): ExtensionJoint
Return extension joint by its name or null if doesn't exist.

#### manager.getPropertyValues(propertyName: String [, onlyActive = true]): Object
Return object where keys are extension joints names, and values are extensions properties values

#### manager.createEvent(eventName: String [, composeFunction: Function]): Function
Create event function. Next step is to call this function to trigger event.
Response from compose function

```javascript
const event = manager.createEvent("onRenderHeader", (extensions, eventName, value) => { extensions.map(extension => extension.getEventListener(eventName)(value)) });
event()
    .then(response => {
        //do something with responses
    })
```

#### Compose functions

composeFunction is function which compose responses from corresponding event handler.
```javascript 
function composeFunction(extensions: <Extension>Array, eventName: String, value: any): any
```

This function will get :
 * extensions - list of extensions which listening for event
 * eventName - event name which is resolving
 * value - init value from called event
 
By default is used `syncListCompose` function which will call sync all event handlers, returns response which will be fulfilled with array of responses.  

Available functions :

 * syncListCompose - will call all event handlers synchronously and return list of responses
 * asyncListCompose - will call all event handlers asynchronously and return promise which will resolve to array of responses

### ExtensionJoint component
This is object containing reference to Manager and to Extension, It also have name.
It is created only in manager when extension is registered

#### extensionJoint.isEnabled(): Boolean

Return true when extension is enabled

#### extensionJoint.enable(): void
Enable extension

#### extensionJoint.disable(): void
Disable extension

#### extensionJoint.getExtension(): Extension
Returns extension

#### extensionJoint.getName(): String
Returns extension name

#### extensionJoint.getManager(): Manager
Returns manager

### Extension component

#### new Extension([extensionData: Object]): extension
Create new extension. ExtensionData is simple object with properties: `properties` and `events`.

#### extension.setProperty(propertyName: String, value: any): extension
Add new property to module

#### extension.hasProperty(propertyName: String): boolean
Check if module has property.

#### extension.getProperty(propertyName: String): any
Return property value.

#### extension.setEventListener(eventName: String, handler: Function): extension
Add new event listener 

#### extension.hasEventListener(eventName: String): boolean
Check if module has event Listener.

#### extension.getEventListener(eventName: String): Function
Return event handler.

## LICENSE

MIT



