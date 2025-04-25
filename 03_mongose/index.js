import express from "express";

import mongoose from "mongoose";
import path from "path";
import Chat from "./models/Chat.js";
import { fileURLToPath } from "url";
const app = express();
import bodyParser from "body-parser";
import methodOverride from "method-override";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.set("view engine", "ejs");
app.set("views", path.join(_dirname, "views"));
app.use(express.static(path.join(_dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log("Connection successfuly Established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// Index Route

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.render("index.ejs", { chats });
});

app.get("/chats/new", async (req, res) => {
  res.render("new.ejs");
});

// Create Route
app.post("/chats", async (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  await Chat.findByIdAndUpdate(id, { msg: msg });
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("let's gets started");
});

app.listen(3000, () => {
  console.log("Server start successfuly");
});
