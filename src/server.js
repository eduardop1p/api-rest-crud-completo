import app from './app';

app.listen(process.env.SEVER_PORT || 4000, () => {
  console.log(`Sevidor rodando em http://localhost:${process.env.SEVER_PORT}`);
});
