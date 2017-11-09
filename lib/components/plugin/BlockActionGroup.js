"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /*
                    * Copyright (c) 2016, Globo.com (https://github.com/globocom)
                    *
                    * License: MIT
                    */

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BlockAction = require("./BlockAction");

var _BlockAction2 = _interopRequireDefault(_BlockAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockActionGroup = (_temp = _class = function (_Component) {
  _inherits(BlockActionGroup, _Component);

  function BlockActionGroup() {
    _classCallCheck(this, BlockActionGroup);

    return _possibleConstructorReturn(this, (BlockActionGroup.__proto__ || Object.getPrototypeOf(BlockActionGroup)).apply(this, arguments));
  }

  _createClass(BlockActionGroup, [{
    key: "renderItem",
    value: function renderItem(item) {
      return _react2.default.createElement(_BlockAction2.default, { item: item, key: item.key });
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "ul",
        { className: "block__action-group" },
        this.props.items.map(this.renderItem)
      );
    }
  }]);

  return BlockActionGroup;
}(_react.Component), _class.propTypes = {
  items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    key: _propTypes2.default.string.isRequired,
    icon: _propTypes2.default.func.isRequired,
    action: _propTypes2.default.func.isRequired
  }))
}, _temp);
exports.default = BlockActionGroup;