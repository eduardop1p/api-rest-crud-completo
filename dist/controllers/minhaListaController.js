"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _minhaListaModel = require('../models/minhaListaModel'); var _minhaListaModel2 = _interopRequireDefault(_minhaListaModel);

class MinhaListaController {
  async index(req, res) {
    const minhaListaIndex = new (0, _minhaListaModel2.default)();

    const minhaLista = await minhaListaIndex.showAllList();

    if (minhaListaIndex.errors.length > 0)
      return res.json({ errors: minhaListaIndex.errors });

    res.json(minhaLista);
  }

  async store(req, res) {
    const { id } = req.params;
    if (!id) return res.send();
    const user = id;

    const minhaListaStore = new (0, _minhaListaModel2.default)({
      id: req.body.id,
      midiaType: req.body.midiaType,
      user,
    });

    const minhaLista = await minhaListaStore.storeMyList();

    if (minhaListaStore.errors.length > 0)
      return res.json({ errors: minhaListaStore.errors });

    return res.json(minhaLista);
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) return res.send();
    const { user } = req.session;

    const minhaListaUpdate = new (0, _minhaListaModel2.default)({
      id: req.body.id,
      midiaType: req.body.midiaType,
      user: user._id,
    });

    const minhaLista = await minhaListaUpdate.updateMyList(id);

    if (minhaListaUpdate.errors.length > 0)
      return res.json({ errors: minhaListaUpdate.errors });

    return res.json(minhaLista);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const minhaListaDelete = new (0, _minhaListaModel2.default)();

    await minhaListaDelete.deleteOneMyList(id);

    if (minhaListaDelete.errors.length > 0)
      return res.json({ errors: minhaListaDelete.errors });

    return res.json({
      deleteItemMyList: 'Item de sua lista deletado com sucesso.',
    });
  }
}

exports. default = new MinhaListaController();
