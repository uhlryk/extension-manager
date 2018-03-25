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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Manager = __webpack_require__(3);

var _Manager2 = _interopRequireDefault(_Manager);

var _Extension = __webpack_require__(4);

var _Extension2 = _interopRequireDefault(_Extension);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Manager: _Manager2.default,
  Extension: _Extension2.default
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);

        this._extensions = {};
    }

    _createClass(Manager, [{
        key: "registerExtension",
        value: function registerExtension(extensionName, extension) {
            this._extensions[extensionName] = extension;
            return this;
        }
    }, {
        key: "getExtensions",
        value: function getExtensions() {
            return Object.values(this._extensions);
        }
    }, {
        key: "getExtensionsWithProperty",
        value: function getExtensionsWithProperty(propertyName) {
            return Object.values(this._extensions).filter(function (extension) {
                return extension.hasProperty(propertyName);
            });
        }
    }, {
        key: "getExtensionByName",
        value: function getExtensionByName(extensionName) {
            return this._extensions[extensionName];
        }
    }, {
        key: "createEvent",
        value: function createEvent(eventName) {
            var _this = this;

            return function (value) {
                return _this.getExtensions().filter(function (extension) {
                    return extension.hasEventListener(eventName);
                }).map(function (extension) {
                    return extension.getEventListener(eventName)(value);
                });
            };
        }
    }]);

    return Manager;
}();

exports.default = Manager;

/***/ }),
/* 4 */
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map