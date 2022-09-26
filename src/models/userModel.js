import mongoose from 'mongoose';
import { isEmail } from 'validator/validator';
import bcryptjs from 'bcryptjs';
import cloudinaryV2 from 'cloudinary';

/* eslint-disable */
import { fotoModel } from './fotoModel';
import { minhaListaModel } from './minhaListaModel';

const userSchema = new mongoose.Schema({
  nome: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  RepetPassword: { type: String, required: true },
  minhaLista: [{ type: mongoose.Types.ObjectId, ref: 'Minha lista' }],
  foto: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }],
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model('User', userSchema);

export default class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async showAllUsers() {
    try {
      this.user = await userModel
        .find()
        .sort({ criadoEm: -1 })
        .select(['email', 'nome', 'minhaLista', 'foto'])
        .populate('minhaLista', ['id', 'midiaType', 'user'])
        .populate('foto', ['originalname', 'filename', 'url', 'user']);

      return this.user;
    } catch {
      this.errors.push('Erro ao obter todos os usuários.');
    }
  }

  async deleteOneUser(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      await minhaListaModel.deleteMany({
        user: id,
      });

      const userPhoto = await fotoModel.findOne({ id });
      if (userPhoto) {
        await cloudinaryV2.v2.uploader.destroy(`images/${userPhoto.filename}`);
        await fotoModel.deleteOne({ id });
      }

      this.user = await userModel.findByIdAndDelete(id);

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch (err) {
      console.log(err);
      this.errors.push('Erro ao deletar usuário.');
    }
  }

  async showOneUser(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.user = await userModel
        .findById(id)
        .sort({ criadoEm: -1 })
        .select(['email', 'nome', 'minhaLista', 'foto']) // com o .select([]) vou passar um array com as chaves que quero pegar da minha colection
        .populate({
          path: 'minhaLista',
          select: ['id', 'midiaType', 'user'],
          options: {
            sort: { criadoEm: -1 },
          },
        })
        .populate({
          path: 'foto',
          select: ['originalname', 'filename', 'url', 'user'],
        });

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch {
      this.errors.push('Erro ao obter usuário.');
    }
  }

  async updateOneUser(id) {
    if (typeof id !== 'string' || !id) return;

    this.valida();
    if (this.errors.length > 0) return;

    const saltPassoword = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    try {
      this.user = await userModel
        .findByIdAndUpdate(id, this.body, { new: true })
        .select(['email', 'nome', 'minhaLista', 'foto'])
        .populate('minhaLista', ['id', 'midiaType', 'user'])
        .populate('foto', ['originalname', 'filename', 'url', 'user']);

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch {
      this.errors.push('Erro ao atualizar usuário.');
    }
  }

  async storeUser() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExist();
    if (this.errors.length > 0) return;

    const saltPassoword = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    this.user = await userModel.create(this.body);
    return this.user;
  }

  async userExist() {
    try {
      this.user = await userModel.findOne({ email: this.body.email });

      if (this.user)
        return this.errors.push('Já existe um usuário com este email.');
    } catch {
      this.errors.push('Erro ao procurar usuário.');
    }
  }

  valida() {
    this.clearUp();

    if (this.body.nome.length < 3 || this.body.nome.length > 8) {
      this.errors.push('Nome deve ter entre 3 e 8 caracteres.');
    }

    if (!isEmail(this.body.email)) this.errors.push('E-mail inválido.');

    if (this.body.password.length < 3 || this.body.password.length > 9) {
      this.errors.push('Senha deve ter entre 3 e 9 caracteres.');
    }

    if (this.body.password !== this.body.RepetPassword) {
      this.errors.push('As senhas não coincidem.');
    }
  }

  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      nome: this.body.nome,
      email: this.body.email,
      password: this.body.password,
      RepetPassword: this.body.RepetPassword,
    };
  }
}

export { userModel };
