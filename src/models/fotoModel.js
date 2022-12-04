import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

/* eslint-disable */
import { userModel } from './userModel';

const fotoSchema = new mongoose.Schema({
  originalname: { type: String, default: '' },
  filename: { type: String, default: '' },
  url: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const fotoModel = mongoose.model('Foto', fotoSchema);
const cloudinaryV2 = cloudinary.v2;

export default class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.foto = null;
  }

  async fotoStore() {
    try {
      const { user } = this.body;

      const existUser = await userModel.findById(user);

      if (!existUser) return this.errors.push('Id não existe.');

      const userPhoto = await fotoModel.findOne({ user });
      if (userPhoto) {
        await cloudinaryV2.uploader.destroy(`images/${userPhoto.filename}`);
        await fotoModel.deleteOne({ user });
      }

      this.foto = await fotoModel.create(this.body);

      await userModel.findByIdAndUpdate(user, { foto: this.foto });

      return this.foto;
    } catch {
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
    } catch {
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
    } catch {
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
    } catch {
      this.errors.push('Erro ao atualizar foto.');
    }
  }

  async deleteOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.find({ user: id });

      if (!this.foto.length) return this.errors.push('Foto já apagada.');

      this.foto.forEach((userPhoto) =>
        cloudinaryV2.uploader.destroy(`images/${userPhoto.filename}`)
      );
      await fotoModel.deleteMany({ user: id });

      return this.foto;
    } catch {
      this.errors.push('Erro ao deletar foto.');
    }
  }
}

export { fotoModel };
