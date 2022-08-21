"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _expresssession = require('express-session'); var _expresssession2 = _interopRequireDefault(_expresssession);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _connectmongo = require('connect-mongo'); var _connectmongo2 = _interopRequireDefault(_connectmongo);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
// import { resolve } from 'path';

var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);
var _minhaListaRoutes = require('./routes/minhaListaRoutes'); var _minhaListaRoutes2 = _interopRequireDefault(_minhaListaRoutes);
var _recuperarSenhaRoutes = require('./routes/recuperarSenhaRoutes'); var _recuperarSenhaRoutes2 = _interopRequireDefault(_recuperarSenhaRoutes);
var _loginRouter = require('./routes/loginRouter'); var _loginRouter2 = _interopRequireDefault(_loginRouter);
var _logoutRouter = require('./routes/logoutRouter'); var _logoutRouter2 = _interopRequireDefault(_logoutRouter);

/* eslint-disable */

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    _dotenv2.default.config();

    this.middleware();
    this.routes();
    this.connectMongoDb();
  }

  middleware() {
    this.app.use(_cors2.default.call(void 0, this.corsOptions()));
    this.app.use(this.sessionOptions());
    this.app.use(
      _helmet2.default.call(void 0, { crossOriginResourcePolicy: { policy: 'cross-origin' } })
    );
    this.app.use(_express2.default.urlencoded({ extended: true }));
    // this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(_express2.default.json());
  }

  routes() {
    this.app.use('/', _homeRoutes2.default);
    this.app.use('/users', _userRoutes2.default);
    this.app.use('/fotos', _fotoRoutes2.default);
    this.app.use('/minha-lista', _minhaListaRoutes2.default);
    this.app.use('/login', _loginRouter2.default);
    this.app.use('/recuperar-senha', _recuperarSenhaRoutes2.default);
    this.app.use('/logout', _logoutRouter2.default);
    this.app.use((req, res) => res.status(404).json({ error: [404] }));
  }

  async connectMongoDb() {
    try {
      await _mongoose2.default.connect(process.env.CONNECT_STRING_MONGODB);
    } catch (err) {
      console.error('Erro ao connectar-se na base de dados.');
    }
  }

  sessionOptions() {
    return _expresssession2.default.call(void 0, {
      secret: process.env.SECRET,
      store: _connectmongo2.default.create({
        mongoUrl: process.env.CONNECT_STRING_MONGODB,
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,
      },
    });
  }

  corsOptions() {
    const allowList = ['http://localhost:3000'];
    return {
      origin: function origin(origin, cb) {
        // !origin para nossa api aceitar a origin do insominia
        if (allowList.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(console.error('Origem não permitida!'), false);
        }
      },
    };
  }
}

exports. default = new App().app;
