const joi = require('joi');

const signUpDTO = joi.object({
    email: joi.string().email().required(),
    phone: joi.string().min(10).required(),
    name: joi.string().required(),
    password: joi.string().required(),
    avatar: joi.string().allow(null, "")
})

module.exports = signUpDTO;