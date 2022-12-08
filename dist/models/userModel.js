"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _validator = require('validator/validator');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);

/* eslint-disable */
var _fotoModel = require('./fotoModel');
var _minhaListaModel = require('./minhaListaModel');

const userSchema = new _mongoose2.default.Schema({
  nome: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  RepetPassword: { type: String, required: true },
  minhaLista: [{ type: _mongoose2.default.Types.ObjectId, ref: 'Minha lista' }],
  foto: [{ type: _mongoose2.default.Types.ObjectId, ref: 'Foto' }],
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const userModel = _mongoose2.default.model('User', userSchema);

exports. default = class {
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
    } catch (e2) {
      this.errors.push('Erro ao obter todos os usuários.');
    }
  }

  async deleteOneUser(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      await _minhaListaModel.minhaListaModel.deleteMany({
        user: id,
      });

      const userPhoto = await _fotoModel.fotoModel.findOne({ user: id });
      if (userPhoto) {
        await _cloudinary2.default.v2.uploader.destroy(`images/${userPhoto.filename}`);
        await _fotoModel.fotoModel.deleteOne({ user: id });
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
        .select(['id', 'email', 'nome', 'foto']) // com o .select([]) vou passar um array com as chaves que quero pegar da minha colection
        .populate({
          path: 'foto',
          select: ['url'],
        });

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch (e3) {
      this.errors.push('Erro ao obter usuário.');
    }
  }

  async updateOneUser(id) {
    if (typeof id !== 'string' || !id) return;

    this.valida();
    if (this.errors.length > 0) return;

    const saltPassoword = _bcryptjs2.default.genSaltSync();
    this.body.password = _bcryptjs2.default.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    try {
      this.user = await userModel
        .findByIdAndUpdate(id, this.body, { new: true })
        .select(['email', 'nome', 'minhaLista', 'foto'])
        .populate('minhaLista', ['id', 'midiaType', 'user'])
        .populate('foto', ['originalname', 'filename', 'url', 'user']);

      if (!this.user) return this.errors.push('Id não existe.');

      return this.user;
    } catch (e4) {
      this.errors.push('Erro ao atualizar usuário.');
    }
  }

  async storeUser() {
    this.valida();
    if (this.errors.length > 0) return;

    await this.userExist();
    if (this.errors.length > 0) return;

    const saltPassoword = _bcryptjs2.default.genSaltSync();
    this.body.password = _bcryptjs2.default.hashSync(this.body.password, saltPassoword);
    this.body.RepetPassword = this.body.password;

    try {
      this.user = await userModel.create(this.body);
      return this.user;
    } catch (e) {
      console.log(e);
      this.errors.push('Erro ao criar usuário.');
    }
  }

  async userExist() {
    try {
      this.user = await userModel.findOne({ email: this.body.email });

      if (this.user)
        return this.errors.push('Já existe um usuário com este email.');
    } catch (e5) {
      this.errors.push('Erro ao procurar usuário.');
    }
  }

  valida() {
    this.clearUp();

    if (this.body.nome.length < 3 || this.body.nome.length > 8) {
      this.errors.push('Nome deve ter entre 3 e 8 caracteres.');
    }

    if (!_validator.isEmail.call(void 0, this.body.email)) this.errors.push('E-mail inválido.');

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

exports.userModel = userModel;
