import app from './app';

app.listen(process.env.PORT || 4000, () =>
  console.log(`Sevidor rodando em ${process.env.APP_URL}`)
);

// comando sucrase abaixo
// "build": "sucrase ./src -d ./dist --transforms imports",
