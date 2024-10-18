const joi = require('joi');

const createRoomServiceDTO = joi.object({
    roomId: joi.number().required(),
    serviceId: joi.number().required()
})

module.exports = createRoomServiceDTO;