import MinhaListaModel from '../models/minhaListaModel';

class MinhaListaController {
  async index(req, res) {
    const { userId } = req.params;
    if (!userId) return res.send();

    const minhaListaIndex = new MinhaListaModel();
    const minhaLista = await minhaListaIndex.showAllList(userId);

    if (minhaListaIndex.errors.length > 0)
      return res.json({ errors: minhaListaIndex.errors });

    res.json(minhaLista);
  }

  async show(req, res) {
    const { userId, id, midiaType } = req.params;
    if (!userId || !id || !midiaType) return res.send();

    const myListShow = new MinhaListaModel();
    const myList = await myListShow.showOneList(userId, id, midiaType);

    if (myListShow.errors.length > 0)
      return res.json({ errors: myListShow.errors });

    res.json(myList);
  }

  async store(req, res) {
    const { id } = req.params;
    if (!id) return res.send();
    const user = id;

    const minhaListaStore = new MinhaListaModel({
      id: req.body.id,
      midiaType: req.body.midiaType,
      user,
    });

    await minhaListaStore.storeMyList();

    if (minhaListaStore.errors.length > 0)
      return res.status(400).json({ errors: minhaListaStore.errors });

    return res.json({ minhaLista: 'Item adcionado a lista com sucesso.' });
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) return res.send();
    const { user } = req.session;

    const minhaListaUpdate = new MinhaListaModel({
      id: req.body.id,
      midiaType: req.body.midiaType,
      user: user._id,
    });

    await minhaListaUpdate.updateMyList(id);

    if (minhaListaUpdate.errors.length > 0)
      return res.status(400).json({ errors: minhaListaUpdate.errors });

    return res.json({ minhaLista: 'Item atualizado com sucesso.' });
  }

  async delete(req, res) {
    const { ids } = req.query;
    if (!ids) return res.json({ error: [404] });
    const arrIds = ids.split(',');

    const minhaListaDelete = new MinhaListaModel();

    await minhaListaDelete.deleteSelectedMyList(arrIds);

    if (minhaListaDelete.errors.length > 0)
      return res.status(400).json({ errors: minhaListaDelete.errors });

    return res.json({
      minhaLista: 'Items deletados com sucesso.',
    });
  }
}

export default new MinhaListaController();
