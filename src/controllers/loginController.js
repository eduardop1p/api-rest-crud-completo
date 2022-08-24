/* eslint-disable */

import Login from '../models/loginModel';
class LoginController {
  async login(req, res) {
    const userLogin = new Login(req.body);

    const user = await userLogin.onLogin();

    if (userLogin.errors.length > 0) {
      res.status(400).json({ errors: userLogin.errors });
      return;
    }

    req.session.user = user;
    req.session.save();
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
      profileUrl: foto.length ? foto.url : '',
    });
  }
}

export default new LoginController();
