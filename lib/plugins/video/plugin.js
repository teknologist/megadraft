"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _VideoButton = require("./VideoButton");

var _VideoButton2 = _interopRequireDefault(_VideoButton);

var _VideoBlock = require("./VideoBlock");

var _VideoBlock2 = _interopRequireDefault(_VideoBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

exports.default = {
  title: "Video",
  type: "video",
  buttonComponent: _VideoButton2.default,
  blockComponent: _VideoBlock2.default
};