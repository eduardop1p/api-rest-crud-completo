"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }/* eslint-disable */

var _loginModel = require('../models/loginModel'); var _loginModel2 = _interopRequireDefault(_loginModel);
class LoginController {
  async login(req, res) {
    const userLogin = new (0, _loginModel2.default)(req.body);

    const user = await userLogin.onLogin();

    if (userLogin.errors.length > 0) {
      res.status(400).json({ errors: userLogin.errors });
      return;
    }

    req.session.user = user;
    req.session.save();
    const { _id, nome, email } = user;
    const { cookie } = req.session;

    res.json({
      _id,
      nome,
      email,
      session: {
        id: req.sessionID,
        expires: cookie.expires,
      },
    });
  }
}

exports. default = new LoginController();
