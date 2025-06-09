const Joi = require('joi');

// Signup Validation
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(12).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            success: false,
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

// Login Validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            success: false,
            errors: error.details.map(err => err.message)
        });
    }

    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
