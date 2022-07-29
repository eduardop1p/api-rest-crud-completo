"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _recuperarSenhaModel = require('../models/recuperarSenhaModel'); var _recuperarSenhaModel2 = _interopRequireDefault(_recuperarSenhaModel);
var _nodemailerConfig = require('../config/nodemailerConfig'); var _nodemailerConfig2 = _interopRequireDefault(_nodemailerConfig);

class RecuperarSenhaControler {
  async userExist(req, res) {
    const recuperarSenha = new (0, _recuperarSenhaModel2.default)(req.body);

    const user = await recuperarSenha.userExistModel();

    if (recuperarSenha.errors.length > 0)
      return res.status(400).json({ errors: recuperarSenha.errors });

    const { _id, email } = user;

    await _nodemailerConfig2.default.sendEmailRecoveryPassword(_id, email);
    return res.json({
      recuperarSenha: [`Enviamos um email para ${email}`],
    });
  }

  async updatePasswordUser(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const recuperarSenha = new (0, _recuperarSenhaModel2.default)(req.body);

    await recuperarSenha.updateUserPasswordModel(id);

    if (recuperarSenha.errors.length > 0)
      return res.status(400).json({ errors: recuperarSenha.errors });

    return res.json({
      recuperarSenha: ['Nova senha criada com sucesso.'],
    });
  }
}

exports. default = new RecuperarSenhaControler();
