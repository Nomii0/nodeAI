import mongoose from "mongoose";

const chatsScheme = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user", "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { Timestamp: true }
);

export default mongoose.model.Chats || mongoose.model("chats", chatsScheme);
