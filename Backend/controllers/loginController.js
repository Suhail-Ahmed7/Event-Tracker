const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/users");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is wrong';

        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Create JWT
        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login Success",
            success: true,
            token,
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        });
    } catch (err) {
        console.error("Login Error:", err);  
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = login;
