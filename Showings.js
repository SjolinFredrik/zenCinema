module.exports = class Showings {

  constructor(app, db, showings) {
    this.app = app;
    this.db = db;
    this.showings = showings;
    this.addRoutes();
  }

  addRoutes() {
    this.app.get('/app/showings/:date', async (req, res) => {

    })
  }

}