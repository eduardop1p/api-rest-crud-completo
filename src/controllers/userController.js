import User from '../models/userModel';

// git reset reseta o repositório para o estado do último commit

class UserController {
  async index(req, res) {
    const usersIndex = new User();

    const users = await usersIndex.showAllUsers();

    res.json(users);
  }

  async store(req, res) {
    const userStore = new User(req.body);

    await userStore.storeUser();

    if (userStore.errors.length > 0)
      return res.json({ errors: userStore.errors });
    return res.json({ user: ['Usuário criado com sucesso.'] });
  }

  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.send();
    console.log(id);

    const userShow = new User(req.body);
    const user = await userShow.showOneUser(id);

    if (userShow.errors.length > 0)
      return res.json({ errors: userShow.errors });

    return res.json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userUpdate = new User(req.body);
    const user = await userUpdate.updateOneUser(id);

    if (userUpdate.errors.length > 0)
      return res.json({ erros: userUpdate.errors });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userDelete = new User(req.body);

    await userDelete.deleteOneUser(id);

    if (userDelete.errors.length > 0)
      return res.json({ errors: userDelete.errors });

    return res.json({ userDelete: ['Usuário deletado com sucesso.'] });
  }
}

export default new UserController();
