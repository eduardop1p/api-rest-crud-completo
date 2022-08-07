"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(process.env.SEVER_PORT || 4000, () => {
  console.log(`Sevidor rodando em http://localhost:${process.env.SEVER_PORT}`);
});
