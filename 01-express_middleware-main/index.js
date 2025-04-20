import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/:username", (req, res) => {
  const { username } = req.params;
  res.render("main.ejs", { username });
});

function passwordCheck(req, res, next) {
  const { password } = req.body;
  if (password === "abc") {
    req.userIsAuthorised = true;
  } else {
    req.userIsAuthorised = false;
  }
  next();
}
app.use(passwordCheck);

app.post("/submit", (req, res) => {
  if (req.userIsAuthorised) {
    res.render("home.ejs");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log("Server successfuly started");
});
