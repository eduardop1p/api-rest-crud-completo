"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _validator = require('validator/validator');

var _userModel = require('./userModel');

exports. default = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async userExistModel() {
    try {
      if (!_validator.isEmail.call(void 0, String(this.body.email)))
        return this.errors.push('E-mail inválido.');

      this.user = await _userModel.userModel.findOne({ email: this.body.email });

      if (!this.user) return this.errors.push('Usuário não existe.');

      return this.user;
    } catch (e) {
      this.errors.push('Erro ao encontrar usuário');
    }
  }

  async updateUserPasswordModel(id) {
    if (typeof id !== 'string' || !id) return;

    this.validaPasswords();
    if (this.errors.length > 0) return;

    const saltPassoword = _bcryptjs2.default.genSaltSync();
    this.body.password = _bcryptjs2.default.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    try {
      this.user = await _userModel.userModel.findByIdAndUpdate(
        id,
        {
          password: this.body.password,
          RepetPassword: this.body.RepetPassword,
        },
        { new: true }
      );

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch (e2) {
      this.errors.push('Erro ao atualizar senha');
    }
  }

  validaPasswords() {
    if (this.body.password.length < 3 || this.body.password.length > 8)
      this.errors.push('Senha deve ter entre 3 e 8 caracteres.');

    if (this.body.password !== this.body.RepetPassword)
      this.errors.push('As senhas não coincidem.');
  }
}
