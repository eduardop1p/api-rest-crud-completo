import app from './app';

app.listen(process.env.SEVER_PORT, () => {
  console.log(`Sevidor rodando em http://localhost:${process.env.SEVER_PORT}`);
});
