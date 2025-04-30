import mongoose from "mongoose";
import Chat from "./models/Chat.js";
import RandomChats from "./RandomChat.js";

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
  .then((res) => {
    console.log("Connection successfuly Established");
  })
  .catch((err) => console.log(err));

Chat.insertMany(RandomChats)
  .then((res) => console.log("Data saved successfuly"))
  .catch((err) => console.log("Something went wront data not saved"));
