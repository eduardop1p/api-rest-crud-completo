import dotEnv from 'dotenv';

dotEnv.config();

export default {
  url: `http://localhost:${process.env.SEVER_PORT}`,
};
