const joi = require('joi');

const createRoomDTO = joi.object({
    photoId: joi.number().allow(null, ''),
    description: joi.string().allow(null, ''),
    price: joi.string().required(),
    numberOfPeople: joi.number(),
})

module.exports = createRoomDTO;