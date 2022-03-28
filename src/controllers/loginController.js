import Login from '../models/loginModel';

class LoginController {
  async login(req, res) {
    const userLogin = new Login(req.body);

    const user = await userLogin.onLogin();

    if (userLogin.errors.length > 0) {
      res.json({ errors: userLogin.errors });
      return;
    }

    req.session.user = userLogin.user;
    req.session.save();

    const { _id, nome, email } = user;

    res.json({ _id, nome, email });
  }
}

export default new LoginController();
