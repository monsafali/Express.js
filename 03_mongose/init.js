import mongoose from "mongoose";
import path from "path";
import Chat from "./models/Chat.js";
import RandomChats from "./RandomChat.js";

main()
  .then((res) => {
    console.log("Connection successfuly Established");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

Chat.insertMany(RandomChats)
  .then((res) => console.log("Data saved successfuly"))
  .catch((err) => console.log("Something went wront data not saved"));
