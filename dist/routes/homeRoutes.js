"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _homeController = require('../controllers/homeController'); var _homeController2 = _interopRequireDefault(_homeController);

const router = _express.Router.call(void 0, );

router.get('/', _homeController2.default.index);

exports. default = router;
