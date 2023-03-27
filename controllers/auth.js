const { Conflict, Unauthorized } = require('http-errors');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');

const { User } = require('../models/user');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict(`Email in use`)
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({ name, email, avatarURL });
    newUser.setPassword(password);
    newUser.save();
    res.status(201).json({
        status: 'success',
        code: 201,
        data: {
            user: {
                email,
                name,
                avatarURL
            }
        }
        
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthorized(`Email is wrong`);
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