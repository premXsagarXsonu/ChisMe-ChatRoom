const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");


exports.createChatroom = async (req, res) => {
    const { name } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) throw "Chat name can contain only alphabets. ";

    const chatroomExist = await Chatroom.findOne({ name });
    if (chatroomExist) throw "Chatroom with that name already exists !";
    const chatroom = new Chatroom({  
        name,
    });
    await chatroom.save();
    res.json({
        message: "Chatroom created !",
    });
}

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});
    res.json(chatrooms);

}