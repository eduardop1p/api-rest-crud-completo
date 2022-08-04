"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable */

class Logout {
  logout(req, res) {
    const errors = [];

    const { authorization } = req.headers;
    req.sessionStore.destroy(authorization, (err) =>
      errors.push('Erro ao fazer logout.')
    );

    if (errors.length) return res.json({ errors: errors });

    res.json({ logout: true });
  }
}

exports. default = new Logout();
