"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginController = require('../controllers/loginController'); var _loginController2 = _interopRequireDefault(_loginController);

const router = _express.Router.call(void 0, );

router.post('/', _loginController2.default.login);

exports. default = router;
