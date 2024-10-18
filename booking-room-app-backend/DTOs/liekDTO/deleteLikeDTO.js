const joi = require('joi');

const deleteLikeDTO = joi.object({
    userId: joi.number().required(),
    commentId: joi.number().required(),
})

module.exports = deleteLikeDTO;