'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * Created by yee.wang on 2019-02-28
 **/
var Vmo =
/*#__PURE__*/
function () {
  _createClass(Vmo, [{
    key: "load",

    /**
     * 用于转换数据到Model
     * @param data
     */
    value: function load(data) {
      var _this = this;

      Object.keys(data).forEach(function (key) {
        if (_this["__proto__"].hasOwnProperty(key)) {
          _this[key] = data[key];
        }
      });
      return this;
    }
  }]);

  function Vmo(data) {
    _classCallCheck(this, Vmo);

    if (data !== undefined) {
      this.load(data);
    }
  }

  _createClass(Vmo, [{
    key: "toJs",
    value: function toJs() {
      var _this2 = this;

      var keys = Object.keys(this);
      var object = {};
      keys.forEach(function (key) {
        if (!/^(function|undefined)$/.test(_typeof(_this2[key]))) {
          object[key] = _this2[key];
        }
      });
      return object;
    }
  }]);

  return Vmo;
}();

/**
 * Created by yee.wang on 2019-03-01
 **/
function mapValue(arr, instance) {
  if (arr instanceof Array) {
    return arr.map(function (data) {
      return new instance(data);
    });
  }

  return null;
}
function Field(target, name) {
  var descr = {
    enumerable: true,
    configurable: true,
    writable: true
  };
  return descr;
}

exports.Vmo = Vmo;
exports.mapValue = mapValue;
exports.Field = Field;
