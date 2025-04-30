import mongoose from "mongoose";

const ChatsSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

let Chat = mongoose.model("Chat", ChatsSchema);

export default Chat;
