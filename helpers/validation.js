const Joi = require("joi");

const register = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8) // Minimum length of 8 characters
        .pattern(new RegExp('(?=.*[a-z])'))  // At least one lowercase letter
        .pattern(new RegExp('(?=.*[A-Z])'))  // At least one uppercase letter
        .pattern(new RegExp('(?=.*[0-9])'))  // At least one digit
        .pattern(new RegExp('(?=.[!@#$%^&])'))  // At least one special character
        .required(),
    role: Joi.string().valid("user", "admin").required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    register,
    login,
};