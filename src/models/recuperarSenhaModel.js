import bcryptjs from 'bcryptjs';
import { isEmail } from 'validator/validator';

import { userModel } from './userModel';

export default class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async userExistModel() {
    try {
      if (!isEmail(String(this.body.email)))
        return this.errors.push('E-mail inválido.');

      this.user = await userModel.findOne({ email: this.body.email });

      if (!this.user) return this.errors.push('Usuário não existe.');

      return this.user;
    } catch {
      this.errors.push('Erro ao encontrar usuário');
    }
  }

  async updateUserPasswordModel(id) {
    if (typeof id !== 'string' || !id) return;

    this.validaPasswords();
    if (this.errors.length > 0) return;

    const saltPassoword = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    try {
      this.user = await userModel.findByIdAndUpdate(
        id,
        {
          password: this.body.password,
          RepetPassword: this.body.RepetPassword,
        },
        { new: true }
      );

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch {
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
