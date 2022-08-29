"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _logoutController = require('../controllers/logoutController'); var _logoutController2 = _interopRequireDefault(_logoutController);

const router = _express.Router.call(void 0, );

router.delete('/', _logoutController2.default.logout);

exports. default = router;
