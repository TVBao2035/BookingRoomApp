const joi = require('joi');

const updateRoomDTO = joi.object({
    id: joi.number().required(),
    photoId: joi.number().allow(null, ''),
    description: joi.string(),
    numberOfPeople: joi.number(),
})

module.exports = updateRoomDTO;