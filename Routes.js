module.exports = class Routes {
    constructor(app, db, models) {
        this.app = app;
        this.db = db;
        for(let key in models){
            this.addRoutes(key, models[key]);
          }
    }
    addRoutes(baseRoute, Model) {
        baseRoute = '/app/' + baseRoute + '/';
        //create our route here 
        this.app.get(baseRoute, async (req, res) => {
            res.json(await Model.find());
        });

        this.app.post(baseRoute, async (req, res) => {
            let err;
            let instance = new Model(req.body);
            let result = await instance.save().catch(
              error => err = error
            )
            res.json(err || result);
        });

        this.app.get(baseRoute + ':id', async(req, res) => {
            let err, result = await Model.findById(req.params.id).catch(
              error => err = error
            );
            res.json(err || result);
          });

        // delete instance by id
        this.app.delete(baseRoute + ':id', async (req,res) => {
            let err, result = await Model.findByIdAndRemove(req.params.id).catch(
            error => err = error
            );
            res.json(err || result);
        });
    }
}