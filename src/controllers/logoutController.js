/* eslint-disable */

class Logout {
  logout(req, res) {
    const { sessionID } = req.params;

    req.sessionStore.destroy(sessionID, (err) => err);

    res.json({ logout: true });
  }
}

export default new Logout();
