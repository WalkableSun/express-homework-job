const express = require("express");
const mongoose = require("mongoose");
const recipeControllers = require("./api/recipe.controllers");

const app = express();
const dataBaseURL = process.env.DB_URL || "mongodb://localhost:27017";

app.use(express.static("static"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/recipes", recipeControllers.findAll);
app.get("/api/recipes/:id", recipeControllers.findById);
app.post("/api/recipes", recipeControllers.add);
app.put("/api/recipes/:id", recipeControllers.update);
app.delete("/api/recipes/:id", recipeControllers.delete);
app.get("/api/import", recipeControllers.import);
app.post("/api/import", recipeControllers.import);
app.get("/api/killall", recipeControllers.killall);
app.delete("/api/killall", recipeControllers.killall);

mongoose
  .connect(dataBaseURL, {})
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
