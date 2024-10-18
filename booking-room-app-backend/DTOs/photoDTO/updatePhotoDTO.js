const joi = require('joi');

const updatePhotoDTO = joi.object({
    id: joi.number().required(),
    roomId: joi.number().allow(null, ''),
    link: joi.string().allow(null, ''),
})

module.exports = updatePhotoDTO;