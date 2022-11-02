const express = require('express');
const { Router } = require('express');

const app = express();
const router = Router();
app.use(express.json());

const home = router.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  try {
    res.json({ success: 'api na homer rodando' });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});

const user = router.get('user', (req, res) => {
  try {
    res.json({ user: { name: 'Eduardo', idade: 20 } });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});

app.use('/', home);
app.use('/api', user);

app.listen(4000, () => console.log('sevidor rodando em http://localhost:4000'));

module.exports = app;
