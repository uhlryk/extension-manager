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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
    function Extension() {
        _classCallCheck(this, Extension);

        this._properties = {};
        this._events = {};
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

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Manager = __webpack_require__(4);

var _Manager2 = _interopRequireDefault(_Manager);

var _Extension = __webpack_require__(0);

var _Extension2 = _interopRequireDefault(_Extension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Manager: _Manager2.default,
  Extension: _Extension2.default
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = __webpack_require__(5);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _functionOverloader = __webpack_require__(6);

var _functionOverloader2 = _interopRequireDefault(_functionOverloader);

var _Extension = __webpack_require__(0);

var _Extension2 = _interopRequireDefault(_Extension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        this._extensions = {};
    }

    _createClass(Manager, [{
        key: "registerExtension",
        value: function registerExtension() {
            var _this = this;

            _functionOverloader2.default.set.apply(_functionOverloader2.default, arguments).when(_functionOverloader2.default.STRING, _functionOverloader2.default.INSTANCE(_Extension2.default)).do(function (extensionName, extension) {
                _this._extensions[extensionName] = { extension: extension, enabled: true };
            });
            return this;
        }
    }, {
        key: "getExtensions",
        value: function getExtensions() {
            var onlyActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            return Object.values(this._extensions).filter(function (extensionData) {
                return onlyActive ? extensionData.enabled : true;
            }).map(function (extensionData) {
                return extensionData.extension;
            });
        }
    }, {
        key: "getExtensionsWithProperty",
        value: function getExtensionsWithProperty(propertyName) {
            var onlyActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this.getExtensions(onlyActive).filter(function (extension) {
                return extension.hasProperty(propertyName);
            });
        }
    }, {
        key: "getExtensionsWithEventListener",
        value: function getExtensionsWithEventListener(eventName) {
            var onlyActive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return this.getExtensions(onlyActive).filter(function (extension) {
                return extension.hasEventListener(eventName);
            });
        }
    }, {
        key: "isExtensionActive",
        value: function isExtensionActive(extensionName) {
            if (this.hasExtension(extensionName)) {
                return this._extensions[extensionName].enabled;
            }
            return false;
        }
    }, {
        key: "disableExtension",
        value: function disableExtension(extensionName) {
            if (this.hasExtension(extensionName)) {
                this._extensions[extensionName].enabled = false;
                return true;
            }
            return false;
        }
    }, {
        key: "enableExtension",
        value: function enableExtension(extensionName) {
            if (this.hasExtension(extensionName)) {
                this._extensions[extensionName].enabled = true;
                return true;
            }
            return false;
        }
    }, {
        key: "hasExtension",
        value: function hasExtension(extensionName) {
            return !!this._extensions[extensionName];
        }
    }, {
        key: "getExtension",
        value: function getExtension(extensionName) {
            if (this.hasExtension(extensionName)) {
                return this._extensions[extensionName].extension;
            }
            return null;
        }
    }, {
        key: "createEvent",
        value: function createEvent(eventName) {
            var _this2 = this;

            return function (value) {
                return _bluebird2.default.all(_this2.getExtensionsWithEventListener(eventName).map(function (extension) {
                    return extension.getEventListener(eventName)(value);
                }));
            };
        }
    }]);

    return Manager;
}();

exports.default = Manager;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("function-overloader");

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map