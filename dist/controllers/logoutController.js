"use strict";Object.defineProperty(exports, "__esModule", {value: true});class Logout {
  logout(req, res) {
    req.session.destroy();

    res.json({ logout: ['Você fez logout.'] });
  }
}

exports. default = new Logout();
