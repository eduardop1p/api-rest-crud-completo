"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _promises = require('fs/promises'); var _promises2 = _interopRequireDefault(_promises);
var _path = require('path');

/* eslint-disable */
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
      const { user } = this.body;

      const existUser = await _userModel.userModel.findById(user);
      if (!existUser) return this.errors.push('Id não existe.');

      this.foto = await fotoModel.create(this.body);

      await _userModel.userModel.findByIdAndUpdate(user, { foto: this.foto });

      return this.foto;
    } catch (e) {
      this.errors.push('Erro ao adcionar foto.');
    }
  }

  async showAllFotos() {
    try {
      this.foto = await fotoModel
        .find()
        .sort({ criadoEm: -1 })
        .select(['originalname', 'filename', 'url', 'user']);

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
        .sort({ criadoEm: -1 })
        .select(['originalname', 'filename', 'url', 'user']);

      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e3) {
      this.errors.push('Erro ao obter foto.');
    }
  }

  async updateOneFoto(id) {
    if (typeof id !== 'string' || !id) return;
    const { user } = this.body;

    try {
      const allPhotosUser = await fotoModel.find({ user });
      allPhotosUser.map(async (userPhoto) => {
        return await _promises2.default.rm(
          _path.resolve.call(void 0, 
            __dirname,
            '..',
            '..',
            'uploads',
            'images',
            userPhoto.filename
          ),
          { force: true }
        );
      });

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
      await _promises2.default.rm(
        _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images', this.foto.filename),
        { force: true }
      );
      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch (e5) {
      this.errors.push('Erro ao deletar foto.');
    }
  }
}

exports.fotoModel = fotoModel;
