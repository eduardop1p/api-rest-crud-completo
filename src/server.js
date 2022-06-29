import app from './app';
import severConfig from './config/severConfig';

app.listen(process.env.PORT || 4050, () => {
  console.log(`Sevidor rodando em ${severConfig.url}`);
});
