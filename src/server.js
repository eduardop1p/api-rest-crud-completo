import app from './app';
import severConfig from './config/severConfig';

app.listen(process.env.PORT, () => {
  console.log(`Sevidor rodando em ${severConfig.url}`);
});
