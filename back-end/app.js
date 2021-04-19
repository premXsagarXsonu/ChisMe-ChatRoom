const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require("cors")());

//routes

app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

// error handlers



module.exports = app;


