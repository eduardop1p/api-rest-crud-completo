/* eslint-disable */

class Logout {
  logout(req, res) {
    const { autorization } = req.headers;

    req.sessionStore.destroy(autorization, (err) => err);

    res.json({ logout: true });
  }
}

export default new Logout();
