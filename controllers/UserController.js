const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        const usernameCheck = await UserModel.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "Username already exist", status: false });
        }
        const emailCheck = await UserModel.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email already exist", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword
        });

        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        return res.json({ message: "Something went wrong!", status: false });
    }
};

module.exports.firebaseLogin = async (req, res, next) => {

    try {
        const { username, email } = req.body;

        const emailCheck = await UserModel.findOne({ email });

        if (emailCheck) {
            return res.json({ status: true, emailCheck });
        }
        else{

            const user = await UserModel.create({
                username,
                email,
            });
            
            return res.json({ status: true, user });
        }
    }
    catch (err) {
        return res.json({ message: "Try any other email", status: false });
    }
};

module.exports.login = async (req, res, next) => {

    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.json({ message: "Invalid Credentials", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.json({ message: "Invalid Credentials", status: false });
        }
        delete user.password;
        return res.json({ status: true, user });
    }
    catch (err) {
        return res.json({ message: "Invalid Credentials", status: false });
    }
};

module.exports.setAvatar = async (req, res, next) => {

    try {
        const user_id = req.params.id;
        const avatarImage = req.body.image;
        const userData = await UserModel.findByIdAndUpdate(user_id, {
            isAvatarImageSet: true,
            avatarImage
        });

        return res.json({ 
            isSet: userData.isAvatarImageSet, 
            image: userData.avatarImage 
        })
    }
    catch (err) {
        return res.json({ message: "Invalid Credentials", status: false });
    }
};


module.exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await UserModel.find({_id: { $ne: req.params.id }}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(users);
    }
    catch (err) {
        return res.json({ message: "Invalid Credentials", status: false });
    }
};