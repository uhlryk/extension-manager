(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Extension = function () {
    function Extension(data) {
        _classCallCheck(this, Extension);

        this._properties = data && data.properties || {};
        this._events = data && data.events || {};
    }

    _createClass(Extension, [{
        key: "setProperty",
        value: function setProperty(propertyName, value) {
            this._properties[propertyName] = value;
            return this;
        }
    }, {
        key: "hasProperty",
        value: function hasProperty(propertyName) {
            return this._properties.hasOwnProperty(propertyName);
        }
    }, {
        key: "getProperty",
        value: function getProperty(propertyName) {
            return this._properties[propertyName];
        }
    }, {
        key: "setEventListener",
        value: function setEventListener(eventName, handler) {
            this._events[eventName] = handler;
            return this;
        }
    }, {
        key: "hasEventListener",
        value: function hasEventListener(eventName) {
            return this._events.hasOwnProperty(eventName);
        }
    }, {
        key: "getEventListener",
        value: function getEventListener(eventName) {
            return this._events[eventName];
        }
    }]);

    return Extension;
}();

exports.default = Extension;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (extensionJoints, eventName, value) {
    return extensionJoints.map(function (extensionJoint) {
        return extensionJoint.getExtension().getEventListener(eventName)(value);
    });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncList = exports.syncList = exports.Extension = exports.Manager = undefined;

var _Manager2 = __webpack_require__(5);

var _Manager3 = _interopRequireDefault(_Manager2);

var _Extension2 = __webpack_require__(0);

var _Extension3 = _interopRequireDefault(_Extension2);

var _syncList2 = __webpack_require__(1);

var _syncList3 = _interopRequireDefault(_syncList2);

var _asyncList2 = __webpack_require__(8);

var _asyncList3 = _interopRequireDefault(_asyncList2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Manager = _Manager3.default;
exports.Extension = _Extension3.default;
exports.syncList = _syncList3.default;
exports.asyncList = _asyncList3.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _functionOverloader = __webpack_require__(6);

var _functionOverloader2 = _interopRequireDefault(_functionOverloader);

var _Extension = __webpack_require__(0);

var _Extension2 = _interopRequireDefault(_Extension);

var _ExtensionJoint = __webpack_require__(7);

var _ExtensionJoint2 = _interopRequireDefault(_ExtensionJoint);

var _syncList = __webpack_require__(1);

var _syncList2 = _interopRequireDefault(_syncList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        this._extensionJoints = {};
    }

    _createClass(Manager, [{
        key: "registerExtension",
        value: function registerExtension() {
            var _this = this;

            _functionOverloader2.default.set.apply(_functionOverloader2.default, arguments).when(_functionOverloader2.default.STRING, _functionOverloader2.default.INSTANCE(_Extension2.default)).do(function (extensionName, extension) {
                _this._extensionJoints[extensionName] = new _ExtensionJoint2.default(extensionName, extension);
            }).when(_functionOverloader2.default.STRING, _functionOverloader2.default.OBJECT).do(function (extensionName, _ref) {
                var properties = _ref.properties,
                    events = _ref.events;

                _this._extensionJoints[extensionName] = new _ExtensionJoint2.default(extensionName, new _Extension2.default({
                    properties: properties,
                    events: events
                }));
            });
            return this;
        }
    }, {
        key: "getExtensionJoints",
        value: function getExtensionJoints() {
            var onlyActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            return Object.values(this._extensionJoints).filter(function (extensionJoint) {
                return onlyActive ? extensionJoint.isEnabled() : true;
            });
        }
    }, {
        key: "getExtensionJointsWithProperty",
        value: function getExtensionJointsWithProperty(propertyName) {
            var onlyActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this.getExtensionJoints(onlyActive).filter(function (extensionJoint) {
                return extensionJoint.getExtension().hasProperty(propertyName);
            });
        }
    }, {
        key: "getExtensionJointsWithEventListener",
        value: function getExtensionJointsWithEventListener(eventName) {
            var onlyActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this.getExtensionJoints(onlyActive).filter(function (extensionJoint) {
                return extensionJoint.getExtension().hasEventListener(eventName);
            });
        }
    }, {
        key: "getPropertyValues",
        value: function getPropertyValues(propertyName) {
            var onlyActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this.getExtensionJointsWithProperty(propertyName, onlyActive).reduce(function (response, extensionJoint) {
                response[extensionJoint.getName()] = extensionJoint.getExtension().getProperty(propertyName);
            }, {});
        }
    }, {
        key: "isExtensionJointEnabled",
        value: function isExtensionJointEnabled(extensionName) {
            if (this.hasExtensionJoint(extensionName)) {
                return this._extensionJoints[extensionName].isEnabled();
            }
            return false;
        }
    }, {
        key: "disableExtensionJoint",
        value: function disableExtensionJoint(extensionName) {
            if (this.hasExtensionJoint(extensionName)) {
                this._extensionJoints[extensionName].disable();
                return true;
            }
            return false;
        }
    }, {
        key: "enableExtensionJoint",
        value: function enableExtensionJoint(extensionName) {
            if (this.hasExtensionJoint(extensionName)) {
                this._extensionJoints[extensionName].enable();
                return true;
            }
            return false;
        }
    }, {
        key: "hasExtensionJoint",
        value: function hasExtensionJoint(extensionName) {
            return !!this._extensionJoints[extensionName];
        }
    }, {
        key: "getExtensionJoint",
        value: function getExtensionJoint(extensionName) {
            if (this.hasExtensionJoint(extensionName)) {
                return this._extensionJoints[extensionName];
            }
            return null;
        }
    }, {
        key: "createEvent",
        value: function createEvent(eventName) {
            var _this2 = this;

            var composeFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _syncList2.default;

            return function (value) {
                return composeFunction(_this2.getExtensionJointsWithEventListener(eventName), eventName, value);
            };
        }
    }]);

    return Manager;
}();

exports.default = Manager;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("function-overloader");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExtensionJoint = function () {
    function ExtensionJoint(name, extension, manager) {
        _classCallCheck(this, ExtensionJoint);

        this._name = name;
        this._extension = extension;
        this._enabled = true;
        this._manager = manager;
    }

    _createClass(ExtensionJoint, [{
        key: "isEnabled",
        value: function isEnabled() {
            return this._enabled;
        }
    }, {
        key: "enable",
        value: function enable() {
            this._enabled = true;
        }
    }, {
        key: "disable",
        value: function disable() {
            this._enabled = false;
        }
    }, {
        key: "getExtension",
        value: function getExtension() {
            return this._extension;
        }
    }, {
        key: "getName",
        value: function getName() {
            return this._name;
        }
    }, {
        key: "getManager",
        value: function getManager() {
            return this._manager;
        }
    }]);

    return ExtensionJoint;
}();

exports.default = ExtensionJoint;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = __webpack_require__(9);

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (extensionJoints, eventName, value) {
    return _bluebird2.default.all(extensionJoints.map(function (extensionJoint) {
        return extensionJoint.getExtension().getEventListener(eventName)(value);
    }));
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map