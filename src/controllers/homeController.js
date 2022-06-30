class HomeController {
  async index(req, res) {
    res.json({ index: ['MFLIX api server Ok!'] });
  }
}

export default new HomeController();
