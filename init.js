const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

mongoose.connect("mongodb://127.0.0.1:27017/ChitChat")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// const Chat = mongoose.model("Chat", chatSchema);

let chats = [
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey Bob, are you free today?",
    createdAt: new Date("2025-08-06T10:00:00")
  },
  {
    from: "Bob",
    to: "Alice",
    msg: "Yeah, let’s catch up around 5?",
    createdAt: new Date("2025-08-06T10:05:00")
  },
  {
    from: "Simmy",
    to: "Jiya",
    msg: "Did you finish the web dev module?",
    createdAt: new Date("2025-08-05T18:30:00")
  },
  {
    from: "Jiya",
    to: "Simmy",
    msg: "Almost done! Will complete it by tonight.",
    createdAt: new Date("2025-08-05T18:45:00")
  },
  {
    from: "Rahul",
    to: "Priya",
    msg: "Good luck for your ML test!",
    createdAt: new Date("2025-08-04T08:00:00")
  },
  {
    from: "Priya",
    to: "Rahul",
    msg: "Thank you so much! Let’s revise later.",
    createdAt: new Date("2025-08-04T08:15:00")
  }
];

Chat.insertMany(chats);