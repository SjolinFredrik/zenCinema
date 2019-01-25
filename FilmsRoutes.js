module.exports = class FilmsRoutes {
    constructor (app, db, films) {
        this.app = app;
        this.db = db;
        this.films = films;
        this.addRoutes();
    }

    addRoutes() {
        this.app.get('/app/films/:title', async (req, res) => {
            let db = this.db;
            let films = this.films;
            let variant = new RegExp(req.params.title, 'i');
            let result = await db.films.find({title: variant}).catch((err) => {
                res.json({
                    error: err
                });
            });
            res.json(result.length > 0 ? result : {error: 'Det finns ingen film med sådan titel'});
        });
    }
}