"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = (req, res, next) => {
  const { sessionID } = req.params;
  if (!sessionID) {
    res.json({ errors: ['Você precisa fazer login.'] });

    return;
  }

  next();
};
