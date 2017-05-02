(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _Manager=__webpack_require__(1);var _Manager2=_interopRequireDefault(_Manager);var _Extension=__webpack_require__(4);var _Extension2=_interopRequireDefault(_Extension);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default={Manager:_Manager2.default,Extension:_Extension2.default};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _Event=__webpack_require__(2);var _Event2=_interopRequireDefault(_Event);var _EventData=__webpack_require__(3);var _EventData2=_interopRequireDefault(_EventData);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Manager=function(){function Manager(){_classCallCheck(this,Manager);this._extensions=[];this._events=[];}_createClass(Manager,[{key:"registerExtension",value:function registerExtension(newExtension){if(this._extensions.some(function(extension){return extension.getName()===newExtension.getName();})===false){this._extensions.push(newExtension);newExtension.init(this);}return this;}},{key:"getExtensions",value:function getExtensions(){return this._extensions;}},{key:"callEvent",value:function callEvent(eventName,value){var event=this._events.find(function(event){return event.getName()===eventName;});var eventData=new _EventData2.default(value);if(event){event.getCallbacks().forEach(function(callback){return callback(eventData);});}return eventData.getResponse();}},{key:"registerEventListener",value:function registerEventListener(eventName,callback){var event=this._events.find(function(event){return event.getName()===eventName;});if(!event){event=new _Event2.default(eventName);this._events.push(event);}event.addCallback(callback);return this;}}]);return Manager;}();exports.default=Manager;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Event=function(){function Event(name){_classCallCheck(this,Event);this._name=name;this._callbacks=[];}_createClass(Event,[{key:"getName",value:function getName(){return this._name;}},{key:"addCallback",value:function addCallback(callback){this._callbacks.push(callback);return this;}},{key:"getCallbacks",value:function getCallbacks(){return this._callbacks;}}]);return Event;}();exports.default=Event;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var EventData=function(){function EventData(initValue){_classCallCheck(this,EventData);this._initValue=initValue;this._response=[];}_createClass(EventData,[{key:"getValue",value:function getValue(){return this._initValue;}},{key:"addResponse",value:function addResponse(response){this._response.push(response);return this;}},{key:"getResponse",value:function getResponse(){return this._response;}}]);return EventData;}();exports.default=EventData;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var Extension=function(){function Extension(){_classCallCheck(this,Extension);this._manager=null;this._name=null;}_createClass(Extension,[{key:"init",value:function init(manager){this._manager=manager;return this;}},{key:"getManager",value:function getManager(){return this._manager;}},{key:"setName",value:function setName(name){this._name=name;}},{key:"getName",value:function getName(){return this._name;}}]);return Extension;}();exports.default=Extension;

/***/ }
/******/ ])
});
;