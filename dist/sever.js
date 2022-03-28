"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _severConfig = require('./config/severConfig'); var _severConfig2 = _interopRequireDefault(_severConfig);

const PORT = process.env.SEVER_PORT;

_app2.default.on('go', () => _app2.default.listen(PORT || 3000, () => {
  console.log(`Sevidor rodando em ${_severConfig2.default.url}`);
}));
