const joi = require('joi');

const createLikeDTO = joi.object({
    userId: joi.number().required(),
    commentId: joi.number().allow(null, ''),
})

module.exports = createLikeDTO;