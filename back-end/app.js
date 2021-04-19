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
























/*const errorhandlers = require("./handlers/errorHanders");
app.use(errorhandlers.notFound);
app.use(errorhandlers.mongooseErrors);
if(process.env.ENV === "DEVELOPMENT"){
    app.use(errorhandlers.DevelopmentErrors)
}else{
    app.use(errorhandlers.propductionErrors);
}
*/