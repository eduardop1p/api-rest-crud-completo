"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = (req, res, next) => {
  if (!req.session.user) {
    res.json({ errors: ['Você precisa fazer login.'] });

    return;
  }

  next();
};
