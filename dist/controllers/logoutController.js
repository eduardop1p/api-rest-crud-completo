"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable */

class Logout {
  logout(req, res) {
    const { autorization } = req.headers;

    req.sessionStore.destroy(autorization, (err) => err);

    res.json({ logout: true });
  }
}

exports. default = new Logout();
