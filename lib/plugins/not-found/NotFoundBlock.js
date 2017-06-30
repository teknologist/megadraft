"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _plugin = require("../../components/plugin");

var _MediaMessage = require("../../components/MediaMessage");

var _MediaMessage2 = _interopRequireDefault(_MediaMessage);

var _icons = require("../../icons");

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License: MIT
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var NotFoundBlock = function (_Component) {
  _inherits(NotFoundBlock, _Component);

  function NotFoundBlock(props) {
    _classCallCheck(this, NotFoundBlock);

    var _this = _possibleConstructorReturn(this, (NotFoundBlock.__proto__ || Object.getPrototypeOf(NotFoundBlock)).call(this, props));

    _this.actions = [{ "key": "delete", "icon": _icons2.default.DeleteIcon, "action": _this.props.container.remove }];
    return _this;
  }

  _createClass(NotFoundBlock, [{
    key: "render",
    value: function render() {
      /* global __ */
      var message = __("Can't show plugin, component \"{type}\" not found.").replace("{type}", this.props.data.type);
      return _react2.default.createElement(
        _plugin.CommonBlock,
        _extends({}, this.props, { actions: this.actions }),
        _react2.default.createElement(
          _plugin.BlockContent,
          { className: "block__notfound" },
          _react2.default.createElement(_MediaMessage2.default, { text: message, type: "warning" }),
          _react2.default.createElement(_icons2.default.ErrorIcon, { className: "block__notfound__icon" })
        )
      );
    }
  }]);

  return NotFoundBlock;
}(_react.Component);

exports.default = NotFoundBlock;