const joi = require('joi');

const createCommentDTO = joi.object({
    userId: joi.number().required(),
    roomId: joi.number().required(),
    commentId: joi.number().allow(null, '').default(0),
    message: joi.string().allow(null, ''),
})

module.exports = createCommentDTO;