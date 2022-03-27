import mongoose from 'mongoose';

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
      this.foto = await fotoModel.create(this.body);

      const { user } = this.body;

      const userAddFoto = await userModel.findById(user)
        .updateMany({ foto: this.foto });

      if (!userAddFoto) this.errors.push('Id não existe.');

      return this.foto;
    } catch {
      this.errors.push('Error ao adicionar foto.');
    }
  }

  async showAllFotos() {
    try {
      this.foto = await fotoModel.find()
        .select(['originalname', 'filename', 'url', 'user'])
        .sort({ criadoEm: -1 });

      return this.foto;
    } catch {
      this.errors.push('Erro ao obter fotos');
    }
  }

  async showOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findById(id)
        .select(['originalname', 'filename', 'url', 'user'])
        .sort({ criadoEm: -1 });

      if (!this.foto) this.errors.push('Id não existe');

      return this.foto;
    } catch {
      this.errors.push('Erro ao obter foto');
    }
  }

  async updateOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findByIdAndUpdate(id, this.body, { new: true });

      if (!this.foto) this.errors.push('Id não existe');
    } catch {
      this.errors.push('Erro ao atualizar foto');
    }
  }

  async deleteOneFoto(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.foto = await fotoModel.findByIdAndDelete(id);

      if (!this.foto) this.errors.push('Id não existe');
    } catch {
      this.errors.push('Erro ao deletar foto');
    }
  }
}
