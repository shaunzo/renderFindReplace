const documentRoutes = (app, fs) => {
  // variables
  const dataPath = "./data/Q1-sample-text.json";

  // READ
  app.get("/documents", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

}
module.exports = documentRoutes;
