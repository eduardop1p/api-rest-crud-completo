import { MulterError } from 'multer';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotEnv from 'dotenv';

dotEnv.config();

/* eslint-disable */

const randomNumber = () => Math.round(Math.random() * 50000);
const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default {
  limits: {
    fileSize: 2048576,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(new MulterError('Arquivo precisa ser PNG ou JPG.'));
    return cb(null, true);
  },
  storage: new CloudinaryStorage({
    cloudinary: cloudinaryV2,
    params: async (req, file) => {
      return {
        folder: 'images',
        public_id: `${Date.now()}_${randomNumber()}`,
      };
    },
  }),
};

// diskStorage({
//   destination(req, file, cb) {
//     cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}_${randomNumber()}${extname(file.originalname)}`);
//   },
// }),
