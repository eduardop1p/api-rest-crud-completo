"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);

/* eslint-disable */
var _userModel = require('./userModel');

const fotoSchema = new _mongoose2.default.Schema({
  originalname: { type: String, default: '' },
  filename: { type: String, default: '' },
  url: { type: String, default: '' },
  user: { type: _mongoose2.default.Schema.Types.ObjectId },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const fotoModel = _mongoose2.default.model('Foto', fotoSchema);
const cloudinaryV2 = _cloudinary2.default.v2;

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

      const userPhoto = await fotoModel.findOne({ user });
      if (userPhoto) {
        await cloudinaryV2.uploader.destroy(`images/${userPhoto.filename}`);
        await fotoModel.deleteOne({ user });
      }

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
        .findOne({ user: id })
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
      const deleteFoto = await fotoModel.findOne({ user: id });

      this.foto = await fotoModel.findOneAndUpdate({ user: id }, this.body, {
        new: true,
      });

      if (!this.foto) return this.errors.push('Id não existe.');

      await cloudinaryV2.uploader.destroy(`images/${deleteFoto.filename}`);

      return this.foto;
    } catch (e4) {
      this.errors.push('Erro ao atualizar foto.');
    }
  }

  async deleteOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.find({ user: id });

      if (!this.foto.length) return this.errors.push('Id não existe.');

      this.foto.forEach((userPhoto) =>
        cloudinaryV2.uploader.destroy(`images/${userPhoto.filename}`)
      );
      await fotoModel.deleteMany({ user: id });

      return this.foto;
    } catch (e5) {
      this.errors.push('Erro ao deletar foto.');
    }
  }
}

exports.fotoModel = fotoModel;
