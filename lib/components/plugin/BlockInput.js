"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var BlockInput = function (_Component) {
  _inherits(BlockInput, _Component);

  function BlockInput() {
    _classCallCheck(this, BlockInput);

    return _possibleConstructorReturn(this, (BlockInput.__proto__ || Object.getPrototypeOf(BlockInput)).apply(this, arguments));
  }

  _createClass(BlockInput, [{
    key: "renderError",
    value: function renderError(error) {
      if (!error) {
        return;
      }
      return _react2.default.createElement(
        "div",
        { className: "block__input__error-text" },
        error
      );
    }
  }, {
    key: "_handleDrop",
    value: function _handleDrop(event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;

      var _props = this.props,
          value = _props.value,
          error = _props.error,
          styles = _props.styles,
          props = _objectWithoutProperties(_props, ["value", "error", "styles"]);

      styles = styles || {};

      var className = (0, _classnames2.default)((_classNames = {
        "block__input": true,
        "block__input--empty": !value,
        "block__input--error": error
      }, _defineProperty(_classNames, "block__input--" + styles.padding + "-padding", styles.padding), _defineProperty(_classNames, "block__input--" + styles.text + "-text", styles.text), _classNames));

      return _react2.default.createElement(
        "div",
        { className: "block__input__row" },
        _react2.default.createElement(
          "div",
          { className: "block__input__wrapper" },
          _react2.default.createElement("input", _extends({}, props, { value: value, type: "text", className: className, onDrop: this._handleDrop })),
          _react2.default.createElement(_icons2.default.EditIcon, { className: "block__input__icon" })
        ),
        this.renderError(error)
      );
    }
  }]);

  return BlockInput;
}(_react.Component);

exports.default = BlockInput;