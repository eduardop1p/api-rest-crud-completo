"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

var _userModel = require('./userModel');

const fotoSchema = new _mongoose2.default.Schema({
  originalname: { type: String, default: '' },
  filename: { type: String, default: '' },
  url: { type: String, default: '' },
  user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'User' },
  criadoEm: {
    type: Date,
    default: Date.now(),
  },
});

const fotoModel = _mongoose2.default.model('Foto', fotoSchema);

exports. default = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.foto = null;
  }

  async fotoStore() {
    try {
      this.foto = await fotoModel.create(this.body);

      const { user } = this.body;

      const userAddFoto = await _userModel.userModel
        .findById(user)
        .updateMany({ foto: this.foto });

      if (!userAddFoto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e) {
      this.errors.push('Error ao adicionar foto.');
    }
  }

  async showAllFotos() {
    try {
      this.foto = await fotoModel
        .find()
        .select(['originalname', 'filename', 'url', 'user'])
        .sort({ criadoEm: -1 });

      return this.foto;
    } catch (e2) {
      this.errors.push('Erro ao obter fotos.');
    }
  }

  async showOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel
        .findById(id)
        .select(['originalname', 'filename', 'url', 'user'])
        .sort({ criadoEm: -1 });

      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e3) {
      this.errors.push('Erro ao obter foto.');
    }
  }

  async updateOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findByIdAndUpdate(id, this.body, {
        new: true,
      });

      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e4) {
      this.errors.push('Erro ao atualizar foto.');
    }
  }

  async deleteOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findByIdAndDelete(id);

      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e5) {
      this.errors.push('Erro ao deletar foto.');
    }
  }
}
