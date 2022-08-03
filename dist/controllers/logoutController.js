"use strict";Object.defineProperty(exports, "__esModule", {value: true});/* eslint-disable */

class Logout {
  logout(req, res) {
    const { sessionID } = req.params;

    req.sessionStore.destroy(sessionID, (err) => err);

    res.json({ logout: true });
  }
}

exports. default = new Logout();
