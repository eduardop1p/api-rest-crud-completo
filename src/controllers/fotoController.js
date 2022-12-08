import multer from 'multer';

/* eslint-disable */

import multerConfig from '../config/multerConfig';
import severConfig from '../config/severConfig';
import Foto from '../models/fotoModel';

const upload = multer(multerConfig).single('user-foto');

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

      const userFoto = new Foto({
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
    const userFoto = new Foto();

    const fotos = await userFoto.showAllFotos();

    if (userFoto.errors.length > 0) {
      return res.status(400).json({ errors: userFoto.errors });
    }

    return res.json(fotos);
  }

  async show(req, res) {
    const { userId } = req.params;
    if (!userId) return res.send();

    const Photo = new Foto();

    const userPhoto = await Photo.showOneFoto(userId);

    if (Photo.errors.length > 0)
      return res.status(400).json({ errors: userPhoto.errors });

    return res.json({
      id: userPhoto._id,
      nome: userPhoto.nome,
      foto: { url: userPhoto.foto.length ? userPhoto.foto[0].url : '' },
    });
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

      const userFoto = new Foto({
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

    const userFoto = new Foto();

    await userFoto.deleteOneFoto(userId);

    if (userFoto.errors.length > 0)
      return res.status(400).json({ errors: userFoto.errors });

    return res.json({ foto: ['Foto deletada com sucesso.'] });
  }
}

export default new FotoController();
