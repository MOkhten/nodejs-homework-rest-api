const { Conflict, Unauthorized } = require('http-errors');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid'); 

const { User } = require('../models/user');
const { sendEmail } = require('../helpers');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email in use`)
    }
    const verificationToken = nanoid();

    const avatarURL = gravatar.url(email, { d: 'identicon' });
    const newUser = new User({ name, email, avatarURL, verificationToken });
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
        to: email,
        subject: "Подтверждение email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    await sendEmail(mail);
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                name,
                avatarURL,
                verificationToken
            }
        }
        
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.verify) {
        throw new Unauthorized(`Email is wrong or not verified`);
    }
    const passCompare = bcript.compareSync(password, user.password);
    if (!passCompare) {
        throw new Unauthorized(`Password is wrong`);
    }
    const playload = {
        id: user._id
    };
    const token = jwt.sign(playload, process.env.SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        status: 'success',
        code: 200,
        data: {
             token
         }

    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).json();
}


module.exports = {
    register,
    login,
    logout,
}