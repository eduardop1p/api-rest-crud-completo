import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`Sevidor rodando em http://localhost:${process.env.PORT}`);
});
