import app from './app';

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Sevidor rodando em ${process.env.APP_URL}`);
});
