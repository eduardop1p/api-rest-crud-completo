class HomeController {
  async index(req, res) {
    res.json({ index: ['Ok!'] });
  }
}

export default new HomeController();
