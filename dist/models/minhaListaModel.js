"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

/* eslint-disable */
var _userModel = require('./userModel');

const minhaListaSchema = new _mongoose2.default.Schema({
  id: { type: {}, require: true },
  midiaType: { type: String, default: '' },
  user: { type: _mongoose2.default.Types.ObjectId },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

const minhaListaModel = _mongoose2.default.model('Minha lista', minhaListaSchema);

exports. default = class {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.minhaLista = null;
  }

  async showAllList(userId) {
    if (typeof userId !== 'string' || !userId) return;

    try {
      this.minhaLista = await minhaListaModel
        .find({ user: userId })
        .sort({ criadoEm: -1 })
        .select(['id', 'midiaType', 'user']);

      return this.minhaLista;
    } catch (e) {
      this.errors.push('Erro ao pegar todos os itens de minha lista.');
    }
  }

  async showOneList(userId, id, midiaType) {
    if (typeof userId !== 'string' || !userId) return;

    try {
      this.minhaLista = await minhaListaModel
        .findOne({ user: userId, id, midiaType })
        .select(['id', 'midiaType', 'user']);

      if (!this.minhaLista)
        return this.errors.push('Item não adcionado a minha lista.');

      return this.minhaLista;
    } catch (e2) {
      this.errors.push('Erro ao pegar item de minha lista.');
    }
  }

  async storeMyList() {
    this.clearUp();

    try {
      const { user } = this.body;

      const existUser = await _userModel.userModel.findById(user);
      if (!existUser) return this.errors.push('Id não existe.');

      this.minhaLista = await minhaListaModel.create(this.body);

      const allMyListUser = await minhaListaModel.find({ user });
      await _userModel.userModel.findByIdAndUpdate(user, { minhaLista: allMyListUser });

      return this.minhaLista;
    } catch (e3) {
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
    } catch (e4) {
      this.errors.push('Erro ao atualizar item da minha lista.');
    }
  }

  async deleteMyList(ids, userId) {
    if (typeof userId !== 'string' || !userId) return;

    if (ids instanceof Array) {
      try {
        this.minhaLista = await minhaListaModel.deleteMany({
          id: ids,
          user: userId,
        });

        if (!this.minhaLista) return this.errors.push('Ids não existe.');

        return this.minhaLista;
      } catch (e5) {
        this.errors.push('Erro ao deletar items de minha lista.');
      }
      return;
    }
    if (typeof ids === 'undefined' && userId) {
      try {
        this.minhaLista = await minhaListaModel.deleteMany({
          user: userId,
        });

        if (!this.minhaLista) return this.errors.push('Id não existe.');

        return this.minhaLista;
      } catch (e6) {
        this.errors.push('Erro ao deletar items de minha lista.');
      }
      return;
    }
    return;
  }

  clearUp() {
    this.body = {
      id: String(this.body.id),
      midiaType: String(this.body.midiaType),
      user: String(this.body.user),
    };
  }
}
