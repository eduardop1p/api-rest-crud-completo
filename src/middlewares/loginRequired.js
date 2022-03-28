export default (req, res, next) => {
  if (!req.session.user) {
    res.json({ errors: ['Você precisa fazer login.'] });

    return;
  }

  next();
};
