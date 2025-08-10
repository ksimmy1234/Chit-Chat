const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const Chat = require("./models/chat.js");
const { runInNewContext } = require("vm");
const methodOverride = require("method-override")


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://127.0.0.1:27017/ChitChat")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

//Index Route
app.get("/chats",async (req,res)=> {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});

//New route
app.get("/chats/new",(req,res) => {
        res.render("newChat.ejs")
});

app.post("/chats",(req,res)=> {
    let {from,to,msg} = req.body;
    let newCh = new Chat({
        from:from,
        to:to,
        msg : msg,
        createdAt:new Date()
    });

    newCh.save().then((res)=>  { console.log("Chat was saved");})
    .catch((err) => { console.log(err);})

    res.redirect("/chats");
})

//Edit Route
app.get("/chats/:id/edit",async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//UPDATE ROUTE
app.put("/chats/:id",async (req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});

    console.log(updatedChat);
    res.redirect("/chats")
})

//DESTROY ROUTE
app.delete("/chats/:id", async(req,res) => {
    let { id } = req.params;
    try{
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats")
    }
    catch{
        console.log(err);
        res.status(500).send("Error deleting chat")
    }
});

app.get("/", (req, res) => { //UTC FORMAT 
    res.send("Home route Working");
});


app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
