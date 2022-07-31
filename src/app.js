import express from 'express';
import session from 'express-session';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import helmet from 'helmet';
import cors from 'cors';
import { resolve } from 'path';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import fotoRoutes from './routes/fotoRoutes';
import minhaLista from './routes/minhaListaRoutes';
import recuperarSenha from './routes/recuperarSenhaRoutes';
import loginRoutes from './routes/loginRouter';
import logoutRoutes from './routes/logoutRouter';

/* eslint-disable */

class App {
  constructor() {
    this.app = express();
    dotEnv.config();
    this.sessionOptions = session({
      secret: process.env.SECRET,
      store: mongoStore.create({
        mongoUrl: process.env.CONNECT_STRING_MONGODB,
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,
        secure: false,
      },
    });

    this.middleware();
    this.routes();
    this.connectMongoDb();
  }

  middleware() {
    this.app.use(cors(this.corsOptions()));
    this.app.use(this.sessionOptions);
    this.app.use(
      helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/fotos', fotoRoutes);
    this.app.use('/minha-lista', minhaLista);
    this.app.use('/login', loginRoutes);
    this.app.use('/recuperar-senha', recuperarSenha);
    this.app.use('/logout', logoutRoutes);
    this.app.use((req, res) => res.status(404).json({ error: [404] }));
  }

  async connectMongoDb() {
    try {
      await mongoose.connect(process.env.CONNECT_STRING_MONGODB);
    } catch (err) {
      console.error('Erro ao connectar-se na base de dados.');
    }
  }

  corsOptions() {
    const allowList = ['http://localhost:30000'];
    return {
      origin: function origin(origin, cb) {
        // !origin para nossa api aceitar a origin do insominia
        if (allowList.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(console.error('Origem não permitida!'), false);
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
    };
  }
}

export default new App().app;
