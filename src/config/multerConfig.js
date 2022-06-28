import { diskStorage, MulterError } from 'multer';
import { resolve, extname } from 'path';

const randomNumber = () => Math.round(Math.random() * 50000);

export default {
  limits: {
    fileSize: 2048576,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(new MulterError('Arquivo precisa ser PNG ou JPG.'));
    return cb(null, true);
  },
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${randomNumber()}${extname(file.originalname)}`);
    },
  }),
};
