const express = require('express');

const app = express();

app.use(express.json());
// app.use((req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
// });

app.get('/', (req, res) => {
  try {
    res.json({ success: 'api na homer rodando' });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});

app.get('/user', (req, res) => {
  try {
    res.json({ user: { name: 'Eduardo', idade: 20 } });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});

app.listen(4000, () => console.log('sevidor rodando em http://localhost:4000'));

module.exports = app;
