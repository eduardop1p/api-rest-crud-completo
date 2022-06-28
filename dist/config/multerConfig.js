"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _multer = require('multer');
var _path = require('path');

const randomNumber = () => Math.round(Math.random() * 50000);

exports. default = {
  limits: {
    fileSize: 2048576,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg')
      return cb(new (0, _multer.MulterError)('Arquivo precisa ser PNG ou JPG.'));
    return cb(null, true);
  },
  storage: _multer.diskStorage.call(void 0, {
    destination(req, file, cb) {
      cb(null, _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}_${randomNumber()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
