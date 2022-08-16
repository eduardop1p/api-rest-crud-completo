"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _recuperarSenhaControler = require('../controllers/recuperarSenhaControler'); var _recuperarSenhaControler2 = _interopRequireDefault(_recuperarSenhaControler);

const router = _express.Router.call(void 0, );

router.post('/', _recuperarSenhaControler2.default.userExistEmail);
router.get('/:id', _recuperarSenhaControler2.default.userExistId);
router.put('/:id', _recuperarSenhaControler2.default.updatePasswordUser);

exports. default = router;
