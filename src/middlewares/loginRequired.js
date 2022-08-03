export default (req, res, next) => {
  const { autorization } = req.headers;

  if (!autorization) {
    res.json({ errors: ['Você precisa fazer login.'] });

    return;
  }

  next();
};
