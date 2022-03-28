import app from './app';
import severConfig from './config/severConfig';

app.on('go', () => app.listen(process.env.PORT || 3000, () => {
  console.log(`Sevidor rodando em ${severConfig.url}`);
}));
