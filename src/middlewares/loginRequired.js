export default (req, res, next) => {
  const { authorization } = req.headers;

  req.sessionStore.get(authorization, (err, session) => {
    if (err) return res.json({ error: 'Erro desconhecido.' });
    if (!session) return res.json({ error: 'Você precisa fazer login.' });

    next();
  });
};
