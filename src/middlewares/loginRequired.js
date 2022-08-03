export default (req, res, next) => {
  const { sessionID } = req.params;
  if (!sessionID) {
    res.json({ errors: ['Você precisa fazer login.'] });

    return;
  }

  next();
};
