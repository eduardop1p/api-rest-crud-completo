import User from '../models/userModel';

// git reset reseta o repositório para o estado do último commit

/* eslint-disable */

class UserController {
  async index(req, res) {
    const usersIndex = new User();

    const users = await usersIndex.showAllUsers();

    if (usersIndex.errors.length > 0)
      return res.status(400).json({ errors: usersIndex.errors });

    res.json(users);
  }

  async store(req, res) {
    const userStore = new User(req.body);

    await userStore.storeUser();

    if (userStore.errors.length > 0)
      return res.status(400).json({ errors: userStore.errors });
    return res.json({ user: ['Usuário criado com sucesso.'] });
  }

  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userShow = new User(req.body);
    const user = await userShow.showOneUser(id);

    if (userShow.errors.length > 0)
      return res.status(400).json({ errors: userShow.errors });

    res.json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userUpdate = new User(req.body);
    await userUpdate.updateOneUser(id);

    if (userUpdate.errors.length > 0)
      return res.status(400).json({ errors: userUpdate.errors });

    return res.json({ user: ['Usuário atualizado com sucesso.'] });
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userDelete = new User();

    await userDelete.deleteOneUser(id);

    if (userDelete.errors.length > 0)
      return res.status(400).json({ errors: userDelete.errors });

    req.session.destroy();
    return res.json({ user: ['Usuário deletado com sucesso.'] });
  }
}

export default new UserController();
