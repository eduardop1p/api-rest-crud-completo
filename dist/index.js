"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

_app2.default.listen(process.env.PORT || 4000, () =>
  console.log(`Sevidor rodando em ${process.env.APP_URL}`)
);

// comando sucrase abaixo para roda versão de prudução
// "build": "sucrase ./src -d ./dist --transforms imports",
