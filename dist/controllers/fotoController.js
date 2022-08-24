"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

/* eslint-disable */

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _severConfig = require('../config/severConfig'); var _severConfig2 = _interopRequireDefault(_severConfig);
var _fotoModel = require('../models/fotoModel'); var _fotoModel2 = _interopRequireDefault(_fotoModel);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('user-foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      const { userId } = req.params;
      if (!userId) return res.send();
      const user = userId;

      const { originalname, path, filename } = req.file;

      if (err) {
        res.json({ error: ['Erro ao fazer upload de imagem.'] });
        return;
      }

      const url = path;

      const userFoto = new (0, _fotoModel2.default)({
        filename: filename.replace('images/', ''),
        originalname,
        url,
        user,
      });

      await userFoto.fotoStore();
      if (userFoto.errors.length > 0) {
        res.status(400).json({ errors: userFoto.errors });
        return;
      }
      return res.json({ foto: { url, filename, user } });
    });
  }

  async index(req, res) {
    const userFoto = new (0, _fotoModel2.default)();

    const fotos = await userFoto.showAllFotos();

    if (userFoto.errors.length > 0) {
      return res.status(400).json({ errors: userFoto.errors });
    }

    return res.json(fotos);
  }

  async show(req, res) {
    const { userId } = req.params;
    if (!userId) return res.send();

    const userFoto = new (0, _fotoModel2.default)();

    const foto = await userFoto.showOneFoto(userId);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json(foto);
  }

  async update(req, res) {
    return upload(req, res, async (err) => {
      const { userId } = req.params;
      if (!userId) return res.send();

      const { originalname, path, filename } = req.file;

      if (err) {
        res.json({ error: ['Erro ao fazer update de imagem.'] });
        return;
      }

      const url = path;

      const userFoto = new (0, _fotoModel2.default)({
        filename: filename.replace('images/', ''),
        user: userId,
        originalname,
        url,
      });

      await userFoto.updateOneFoto(userId);

      if (userFoto.errors.length > 0) {
        res.status(400).json({ errors: userFoto.errors });
        return;
      }

      return res.json({ foto: ['Foto atualizada com sucesso.'] });
    });
  }

  async delete(req, res) {
    const { userId } = req.params;
    if (!userId) return res.send();

    const userFoto = new (0, _fotoModel2.default)();

    await userFoto.deleteOneFoto(userId);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json({ foto: ['Foto deletada com sucesso.'] });
  }
}

exports. default = new FotoController();
