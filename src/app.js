import express from 'express';
import session from 'express-session';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { resolve } from 'path';

import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import fotoRoutes from './routes/fotoRoutes';
import loginRoutes from './routes/loginRouter';
import logoutRoutes from './routes/logoutRouter';

class App {
  constructor() {
    this.app = express();
    dotEnv.config();
    this.parseForm = bodyParser.urlencoded({ extended: false });
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
      },
    });

    this.middleware();
    this.routes();
    this.connectMongoDb();
  }

  middleware() {
    this.app.use(cors(this.corsOptions()));
    this.app.use(
      helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(express.json());
    this.app.use(this.sessionOptions);
    this.app.use(cookieParser());
    this.app.use(this.parseForm);
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/fotos', fotoRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/logout', logoutRoutes);
  }

  async connectMongoDb() {
    try {
      await mongoose.connect(process.env.CONNECT_STRING_MONGODB);
      this.app.emit('go');
    } catch (err) {
      console.log('Erro ao connectar-se na base de dados.');
    }
  }

  corsOptions() {
    const whiteList = [
      'https://www.google.com',
      'http://localhost:4000',
      'http://localhost:5000',
    ];
    return {
      origin(origin, cb) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
          cb(null, true);
        } else {
          cb(new Error('not allowed by CORS!'));
        }
      },
    };
  }
}

export default new App().app;
