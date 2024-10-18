const joi = require('joi');

const createPhotoDTO = joi.object({
    roomId: joi.number().allow(null, ''),
    link: joi.string().allow(null, ''),
})

module.exports = createPhotoDTO;