class Logout {
  logout(req, res) {
    req.session.destroy();

    res.json({ logout: ['Você fez logout.'] });
  }
}

export default new Logout();
