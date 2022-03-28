import dotEnv from 'dotenv';

dotEnv.config();

export default {
  url: process.env.APP_URL,
};
