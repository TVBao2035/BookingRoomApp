const joi = require('joi');

const updateRoomServiceDTO = joi.object({
    roomId: joi.number().required(),
    serviceId: joi.number().required()
})

module.exports = updateRoomServiceDTO;