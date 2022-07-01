"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _minhaListaController = require('../controllers/minhaListaController'); var _minhaListaController2 = _interopRequireDefault(_minhaListaController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

// router.get('/', minhaListaController.index);
router.post('/:id', _loginRequired2.default, _minhaListaController2.default.store);
// router.put('/:id', loginRequired, minhaListaController.update);
router.delete('/:id', _loginRequired2.default, _minhaListaController2.default.delete);

exports. default = router;
