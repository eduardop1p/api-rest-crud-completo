"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _fotoController = require('../controllers/fotoController'); var _fotoController2 = _interopRequireDefault(_fotoController);

const router = _express.Router.call(void 0, );

// router.get('/', fotoController.index);
router.post('/:id', _loginRequired2.default, _fotoController2.default.store);
// router.get('/:id', loginRequired, fotoController.show);
router.put('/:id', _loginRequired2.default, _fotoController2.default.update);
router.delete('/:id', _loginRequired2.default, _fotoController2.default.delete);

exports. default = router;
