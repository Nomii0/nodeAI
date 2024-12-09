import mongoose from "mongoose";

const userChatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    chats: [
      {
        _id: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
  },
  { Timestamp: true }
);

export default mongoose.model.userChats ||
  mongoose.model("userChats", userChatSchema);
