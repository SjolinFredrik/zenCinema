module.exports = class FilmsRoutes {
    constructor(app, films) {
        this.app = app;
        this.films = films;
        this.addRoutes();
    }

    addRoutes() {
        this.app.get('/app/films/title/:title', async (req, res) => {
            let films = this.films;
            let variant = new RegExp(req.params.title, 'i');
            let result = await films.find({
                title: variant
            }).catch((err) => {
                res.json({
                    error: err
                });
            });
            res.json(result.length > 0 ? result : {
                error: 'Det finns ingen film med sådan titel'
            });
        });
    }
}