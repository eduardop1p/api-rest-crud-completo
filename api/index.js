const express = require('express');
const { Router } = require('express');

const app = express();
const router = Router();

app.use(express.json());

const routerGetHome = router.get('/', (req, res) => {
  try {
    res.json({ success: 'api na homer rodando' });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});
const routerGetUser = router.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  try {
    res.json({ user: { name: 'Eduardo', idade: 20 } });
  } catch {
    res.status(500).json({
      error: 'internal server erro',
    });
  }
});

app.use(routerGetHome);
app.use(routerGetUser);

app.listen(4000, () => console.log('sevidor rodando em http://localhost:4000'));

// abc
