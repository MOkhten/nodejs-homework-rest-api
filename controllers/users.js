const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require("jimp");
const { NotFound } = require('http-errors');

const getCurrent = async (req, res) => {
   
    const { name, email } = req.user;
    res.json({
        status: 'success',
        code: 200,
        data: {
            user: {
                name,
                email
            }

        }
    })
};

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => { 
    const {path: tempUpload, originalname} = req.file;
    const {_id: id} = req.user;
    const imageName =  `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("public", "avatars", imageName);

        const image = await Jimp.read(resultUpload);
        image.resize(250, 250);
        image.write(resultUpload);
        
        await User.findByIdAndUpdate(req.user._id, {avatarURL});
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload);
        throw error;
    }
};

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw NotFound();
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.json({
        "message": "Verification email sent"
    })
}


module.exports = {
    getCurrent,
    updateAvatar,
    verifyEmail,
}