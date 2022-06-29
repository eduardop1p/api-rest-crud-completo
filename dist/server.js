"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _severConfig = require('./config/severConfig'); var _severConfig2 = _interopRequireDefault(_severConfig);

_app2.default.listen(process.env.PORT || 4050, () => {
  console.log(`Sevidor rodando em ${_severConfig2.default.url}`);
});
