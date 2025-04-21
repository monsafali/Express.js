import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import bodyParser from "body-parser";
import methodOverride from "method-override";
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

let posts = [
  { id: uuidv4(), name: "monsaf", Description: "i love Mern STackprograming" },
  { id: uuidv4(), name: "kaleem", Description: "i love Django Programing" },
  { id: uuidv4(), name: "Boss", Description: "I love AI ML Development" },
];

app.get("/post", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/post/new", (req, res) => {
  res.render("Add.ejs");
});

app.post("/posts", (req, res) => {
  let { name, Description } = req.body;
  let id = uuidv4();
  posts.push({ id, name, Description });

  res.redirect(`/post`);
});

app.get("/post/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  res.render("show.ejs", { post });
});

app.patch("/post/:id", (req, res) => {
  let newDescription = req.body.Description;
  let { id } = req.params;
  let post = posts.find((onepost) => onepost.id === id);
  post.Description = newDescription;
  res.redirect("/post");
});

app.get("/post/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((post) => post.id === id);
  res.render("Update.ejs", { post });
});
app.listen(port, () => {
  console.log("Server successfuly started");
});
