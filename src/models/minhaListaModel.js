import mongoose from 'mongoose';

/* eslint-disable */
import { userModel } from './userModel';

const minhaListaSchema = new mongoose.Schema({
  id: { type: String, require: true },
  midiaType: { type: String, default: '' },
  user: { type: mongoose.Types.ObjectId },
  criadoEm: {
    type: Date,
    default: Date.now(),
  },
});

const minhaListaModel = mongoose.model('Minha lista', minhaListaSchema);

export default class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.minhaLista = null;
  }

  async showAllList() {
    try {
      this.minhaLista = await minhaListaModel
        .find()
        .sort({ criadoEm: -1 })
        .select(['id', 'midiaType', 'user']);

      return this.minhaLista;
    } catch {
      this.errors.push('Erro ao pegar todos os itens de minha lista.');
    }
  }

  async storeMyList() {
    try {
      const { user } = this.body;

      const existUser = await userModel.findById(user);
      if (!existUser) return this.errors.push('Id não existe.');

      this.minhaLista = await minhaListaModel.create(this.body);

      const allMyListUser = await minhaListaModel.find({ user });
      await userModel.findByIdAndUpdate(user, { minhaLista: allMyListUser });

      return this.minhaLista;
    } catch {
      this.errors.push('Erro ao adcionar item a minha lista.');
    }
  }

  async updateMyList(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.minhaLista = await minhaListaModel.findByIdAndUpdate(id, this.body, {
        new: true,
      });

      if (!this.minhaLista) return this.errors.push('Id não existe.');

      return this.minhaLista;
    } catch {
      this.errors.push('Erro ao atualizar item da minha lista.');
    }
  }

  async deleteOneMyList(id) {
    if (typeof id !== 'string' || !id) return;

    try {
      this.minhaLista = await minhaListaModel.findByIdAndDelete(id);

      if (!this.minhaLista) return this.errors.push('Id não existe.');

      return this.minhaLista;
    } catch {
      this.errors.push('Erro ao deletar item da minha lista.');
    }
  }
}
