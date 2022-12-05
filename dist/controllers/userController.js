"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _userModel = require('../models/userModel'); var _userModel2 = _interopRequireDefault(_userModel);

// git reset reseta o repositório para o estado do último commit

class UserController {
  async index(req, res) {
    const usersIndex = new (0, _userModel2.default)();

    const users = await usersIndex.showAllUsers();

    if (usersIndex.errors.length > 0)
      return res.status(400).json({ errors: usersIndex.errors });

    res.json(users);
  }

  async store(req, res) {
    const userStore = new (0, _userModel2.default)(req.body);

    await userStore.storeUser();

    if (userStore.errors.length > 0)
      return res.status(400).json({ errors: userStore.errors });
    return res.json({ user: ['Usuário criado com sucesso.'] });
  }

  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userShow = new (0, _userModel2.default)(req.body);
    const user = await userShow.showOneUser(id);

    if (userShow.errors.length > 0)
      return res.status(400).json({ errors: userShow.errors });

    const { _id, nome, email, foto } = user;
    const { cookie } = req.session;

    res.json({
      _id,
      nome,
      email,
      session: {
        id: req.sessionID,
        expires: cookie.expires,
      },
      profileUrl: foto.length ? foto[0].url : '',
    });
  }

  async update(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userUpdate = new (0, _userModel2.default)(req.body);
    await userUpdate.updateOneUser(id);

    if (userUpdate.errors.length > 0)
      return res.status(400).json({ errors: userUpdate.errors });

    return res.json({ user: ['Usuário atualizado com sucesso.'] });
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userDelete = new (0, _userModel2.default)();

    await userDelete.deleteOneUser(id);

    if (userDelete.errors.length > 0)
      return res.status(400).json({ errors: userDelete.errors });

    req.session.destroy();
    return res.json({ user: ['Usuário deletado com sucesso.'] });
  }
}

exports. default = new UserController();
