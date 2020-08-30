
const documentRoutes = require('./documents');
const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("Serving documents");
  });

  documentRoutes(app, fs);
};

module.exports = appRouter;
