import bcryptjs from 'bcryptjs';
import { isEmail } from 'validator/validator';
import { userModel } from './userModel';

export default class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async onLogin() {
    this.valida();

    if (this.errors.length > 0) return;

    try {
      this.user = await userModel.findOne({ email: this.body.email });

      if (!this.user) return this.errors.push('Usuário não existe.');

      if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
        this.errors.push('Senha inválida.');
        this.user = null;
        return;
      }

      return this.user;
    } catch (err) {
      console.error(err);
    }
  }

  valida() {
    this.clearUp();

    if (!isEmail(this.body.email)) this.errors.push('E-mail inválido.');

    if (this.body.password.length < 3 || this.body.password.length > 9) this.errors.push('Senha deve ter entre 3 e 9 caracteres.');
  }

  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') this.body[key] = '';
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}
