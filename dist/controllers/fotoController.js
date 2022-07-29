"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);
var _severConfig = require('../config/severConfig'); var _severConfig2 = _interopRequireDefault(_severConfig);
var _fotoModel = require('../models/fotoModel'); var _fotoModel2 = _interopRequireDefault(_fotoModel);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('user-foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      const { id } = req.params;
      if (!id) return res.send();
      const user = id;

      const { originalname, filename } = req.file;

      if (err) {
        res.json({ erro: err.code });
        return;
      }

      const url = `${_severConfig2.default.url}/images/${filename}`;

      const userFoto = new (0, _fotoModel2.default)({
        originalname,
        filename,
        url,
        user,
      });

      await userFoto.fotoStore();
      if (userFoto.errors.length > 0) {
        res.status(400).json({ errors: userFoto.errors });
        return;
      }
      return res.json({ foto: ['Foto adcionada com sucesso.'] });
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
    const { id } = req.params;
    if (!id) return res.send();

    const userFoto = new (0, _fotoModel2.default)();

    const foto = await userFoto.showOneFoto(id);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json(foto);
  }

  async update(req, res) {
    return upload(req, res, async (err) => {
      const { id } = req.params;
      if (!id) return res.send();
      const { user } = req.session;

      const { originalname, filename } = req.file;

      if (err) {
        res.json({ errors: err.code });
        return;
      }

      const url = `${_severConfig2.default.url}/images/${filename}`;

      const userFoto = new (0, _fotoModel2.default)({
        originalname,
        filename,
        url,
        user: user._id,
      });

      await userFoto.updateOneFoto(id);

      if (userFoto.errors.length > 0) {
        res.status(400).json({ errors: userFoto.errors });
        return;
      }

      return res.json({ foto: ['Foto atualizada com sucesso.'] });
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userFoto = new (0, _fotoModel2.default)();

    await userFoto.deleteOneFoto(id);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json({ foto: ['Foto deletada com sucesso.'] });
  }
}

exports. default = new FotoController();
