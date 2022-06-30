"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req, res) {
    res.json({ index: ['MFLIX api server Ok!'] });
  }
}

exports. default = new HomeController();
