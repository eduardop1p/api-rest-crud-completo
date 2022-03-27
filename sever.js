import app from './app';
import severConfig from './config/severConfig';

const PORT = process.env.SEVER_PORT;

app.on('go', () => app.listen(PORT, () => {
  console.log(`Sevidor rodando em ${severConfig.url}`);
}));
