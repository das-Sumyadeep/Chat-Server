const MessageModel = require('../models/MessageModel');

module.exports.addMssg = async (req, res, next) => {

    try {
        const { from, to, message, file } = req.body;

        if(file){
            const data = await MessageModel.create({

                message: { file: file },
                users: [from, to],
                sender: from
            });

            if (data) return res.json({ mssg: "Message added successfully!" });
            return res.json({ mssg: "Failed to add message" });
        }
        
        const data = await MessageModel.create({

            message: { text: message },
            users: [from, to],
            sender: from
        });

        if (data) return res.json({ mssg: "Message added successfully!" });
        return res.json({ mssg: "Failed to add message" });

    }
    catch (err) {
        return res.json({ mssg: "Failed to add message" });
    }
};

module.exports.getAllMssg = async (req, res, next) => {

    try {
        const { from, to } = req.body;
        const messages = await MessageModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        
        const projectMessages = messages.map((msg)=> {
            return {
                fromSelf: msg.sender.toString() == from,
                text: msg.message.text,
                file: msg.message.file
            }
        });
        res.json(projectMessages);
    }
    catch (err) {
        return res.json({ mssg: "Failed to get message" });
    }
};