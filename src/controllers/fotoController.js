import multer from 'multer';

import multerConfig from '../config/multerConfig';
import severConfig from '../config/severConfig';
import Foto from '../models/fotoModel';

const upload = multer(multerConfig).single('user-foto');

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

      const url = `${severConfig.url}/images/${filename}`;

      const userFoto = new Foto({
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
    const userFoto = new Foto();

    const fotos = await userFoto.showAllFotos();

    if (userFoto.errors.length > 0) {
      return res.status(400).json({ errors: userFoto.errors });
    }

    return res.json(fotos);
  }

  async show(req, res) {
    const { id } = req.params;
    if (!id) return res.send();

    const userFoto = new Foto();

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

      const url = `${severConfig.url}/images/${filename}`;

      const userFoto = new Foto({
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

    const userFoto = new Foto();

    await userFoto.deleteOneFoto(id);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json({ foto: ['Foto deletada com sucesso.'] });
  }
}

export default new FotoController();
