"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _userController = require('../controllers/userController'); var _userController2 = _interopRequireDefault(_userController);

const router = _express.Router.call(void 0, );

router.get('/', _userController2.default.index);
router.post('/', _userController2.default.store);
router.put('/:id', _loginRequired2.default, _userController2.default.update);
router.get('/:id', _loginRequired2.default, _userController2.default.show);
router.delete('/:id', _loginRequired2.default, _userController2.default.delete);

exports. default = router;
