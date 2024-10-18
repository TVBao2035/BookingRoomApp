const createRoomServiceDTO = require("../DTOs/roomServiceDTO/createRoomServcieDTO");
const updateRoomServiceDTO = require("../DTOs/roomServiceDTO/updateRoomServcieDTO");
const RoomServiceService = require("../Service/RoomServiceService");

 class RoomServiceController{
    async update(req, res){
        try {
            const {error, value} = updateRoomServiceDTO.validate(req.body);
            const id = req.params.id;
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const {serviceId, roomId} = value;
            const data = await RoomServiceService.update({ serviceId, roomId, id });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async delete(req, res){
        try {
            const id  = req.params.id;
            const data = await RoomServiceService.delete(id);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async create(req, res){
        try {
            const {error, value} = createRoomServiceDTO.validate(req.body);

            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            console.log(value);
            const data = await RoomServiceService.create(value);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getAll(req, res){
        try {
            const {page=1, limit=5} = req.query;
            const data = await RoomServiceService.getAll(Number(page), Number(limit));
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
 }

 module.exports = new RoomServiceController;