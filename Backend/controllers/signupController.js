const bcrypt = require('bcrypt');
const UserModel = require('../models/users');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({ name, email, password: hashedPassword });

        res.status(201).json({
            message: 'Signup successful',
            success: true
        });

    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = signup;
