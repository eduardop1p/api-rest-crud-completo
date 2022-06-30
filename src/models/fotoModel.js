import mongoose from 'mongoose';
import fs from 'fs/promises';
import { resolve } from 'path';

/* eslint-disable */
import { userModel } from './userModel';

const fotoSchema = new mongoose.Schema({
  originalname: { type: String, default: '' },
  filename: { type: String, default: '' },
  url: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  criadoEm: {
    type: Date,
    default: Date.now(),
  },
});

const fotoModel = mongoose.model('Foto', fotoSchema);

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
        .findById(id)
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
      const userPhotoUpdate = await fotoModel.find({ user });
      userPhotoUpdate.map((userPhoto) =>
        fs.rm(
          resolve(
            __dirname,
            '..',
            '..',
            'uploads',
            'images',
            userPhoto.filename
          ),
          { force: true }
        )
      );

      this.foto = await fotoModel.findByIdAndUpdate(id, this.body, {
        new: true,
      });

      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch {
      this.errors.push('Erro ao atualizar foto.');
    }
  }

  async deleteOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findByIdAndDelete(id);
      fs.rm(
        resolve(__dirname, '..', '..', 'uploads', 'images', this.foto.filename),
        { force: true }
      );
      if (!this.foto) return this.errors.push('Id não existe.');

      return this.foto;
    } catch {
      this.errors.push('Erro ao deletar foto.');
    }
  }
}

export { fotoModel };
