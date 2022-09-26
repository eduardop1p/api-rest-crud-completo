"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer');
var _cloudinary = require('cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);
var _multerstoragecloudinary = require('multer-storage-cloudinary');
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();

/* eslint-disable */

const randomNumber = () => Math.round(Math.random() * 50000);
const cloudinaryV2 = _cloudinary2.default.v2;
cloudinaryV2.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports. default = {
  limits: {
    fileSize: 2048576,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(new (0, _multer.MulterError)('Arquivo precisa ser PNG ou JPG.'));
    return cb(null, true);
  },
  storage: new (0, _multerstoragecloudinary.CloudinaryStorage)({
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
