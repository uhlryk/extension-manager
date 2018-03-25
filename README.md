# EXTENSIONER
[![Build Status](https://travis-ci.org/uhlryk/extensioner.svg)](https://travis-ci.org/uhlryk/extensioner)
[![Downloads](https://img.shields.io/npm/dt/extensioner.svg)](https://www.npmjs.com/package/extensioner)
[![Downloads](https://img.shields.io/npm/dm/extensioner.svg)](https://www.npmjs.com/package/extensioner)
[![NPM version](https://img.shields.io/npm/v/extensioner.svg)](https://www.npmjs.com/package/extensioner)

## DESCRIPTION

Extensioner is to simplify appication scalability. Huge apps usually are splited into modules. Everythhing is easy when each module has only one starting point.
A problem appears when each part of each modules should be initialized in multiple different places. And this should be done each time new module is added. When module is removed, initialization should be changed too.

This library is responsible for managing all app modules. You only initialize everything once and then just register and unregister new and old modules.

## Use case

```javascript
import SomeModule1 from "/modules/SomeModule1";
import SomeModule2 from "/modules/SomeModule2";
//...
import SomeModuleN from "/modules/SomeModuleN";


import { Manager, Extension } from "extensioner";

const manager = new Manager();
manager.registerExtension("some module 1", new SomeModule1())
manager.registerExtension("some module 2", new SomeModule2())
//...
manager.registerExtension("some module N", new SomeModuleN())


//list all extensions and do something with all of them.
manager.getExtensions().forEach(extension => {
    //do some logic
})

//reverse responsiblity, Each module can register listeners for any manager event and prepare response
const event = manager.createEvent("doSomething");

event("some value")
    .then(response => {
        //do some logic
    });

```
## API

### new Manager(): manager
Creates new manager

### new Extension(): extension
Each module should have one root class with all settings and this class should extend Extension

### manager.registerExtension(extensionInstanceName: String, extension: Extension): manager
Allow to register/add any new extension and return same manager instance

### manager.getExtensions(): Array<extension>
Return all extensions previously registered

### manager.getExtensionsWithProperty(propertyName: String): Array<extensions>
Returns array of extensions if they have specific property

### manager.getExtensionsWithEventListener(eventName: String): Array<extensions>
Returns array of extensions if they have specific event listener

### manager.getExtensionByName(extensionInstanceName: String): extension
Return extension by its name

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



