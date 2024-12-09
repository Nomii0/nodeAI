import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Chats from "../backend/models/chat.js";
import userChats from "./models/userChat.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "/",
    credentials: true,
  })
);
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_STRING);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("connect function", error.message);
  }
};

// app.get("/api/test", ClerkExpressRequireAuth({}), (req, res) => {
//   const userId = req.auth.userId;
//   console.log(userId);
//   res.send("success");
// });

app.post("/api/chats", ClerkExpressRequireAuth({}), async (req, res) => {
  const userId = req.auth.userId;
  const { text } = req.body;
  try {
    const newChat = new Chat({
      userId: userId,
      history: [{ role: "user", parts: [{ text }] }],
    });
    const savedChat = await newChat.save();
    // Check if the chat already exit
    const usersChats = userChats.find({ userId: userId });

    // if not exist create a new one and add that to chat array
    if (!usersChats.length) {
      const newUser = new userChats({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });
      await newUser.save();
    } else {
      // if exist push the chat to the existing array
      await userChats.updateOne(
        {
          userId: userId,
        },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log("api/chats error:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;

  try {
    const userChat = await userChats.find({ userId });
    res.status(200).send(userChat);
  } catch (error) {
    console.log("api/chats error:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});
// app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
//   const userId = req.auth.userId;

//   try {
//     const chat = await Chats.findOne({ _id: req.params.id, userId });
//     console.log(chat);
//     res.status(200).send(chat);
//   } catch (err) {
//     console.log("error in api/chat/id", err);
//     res.status(500).send("Error fetching chat!");
//   }
// });

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
  const userId = req.auth.userId;
  try {
    const chat = await Chats.findOne({ _id: req.params.id, userId });
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    console.log("error in api/chat/id", err);
    res
      .status(500)
      .json({ error: "Error fetching chat!", error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack, "clerk error ");
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  connect();
  console.log(`server running on port ${port}`);
});
