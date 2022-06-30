import app from './app';

console.log(process.env.SEVER_PORT);

app.listen(process.env.SEVER_PORT, () => {
  console.log(`Sevidor rodando em http://localhost:${process.env.SEVER_PORT}`);
});
