const createRoomDTO = require('../DTOs/roomDTO/createRoomDTO.js');
const updateRoomDTO = require('../DTOs/roomDTO/updateRoomDTO.js');
const db = require('../models/index.js');
const RoomService = require('../Service/RoomService.js');

class RoomController {

    async create(req, res){
        try {
            const {error, value} = createRoomDTO.validate(req.body);

            if(error){
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                    data: error.details[0].path[0] 
                })
            }

            const data = await RoomService.create(value);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async delete(req, res){
        try {
            const roomId = req.params.id;
            const data = await RoomService.delete(roomId);
            res.status(200).json(data);
            
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async update(req, res){
        try {
            const {error, value} = updateRoomDTO.validate(req.body);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: "Fields from client is not valid"
                })
            }
         
            const data = await RoomService.update(value);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getAll(req, res){
        try {
            const {sort, type, isNotHired=0, allPhotos = 0, notPhoto=1, page=1, limit=5} = req.query;
            if (isNaN(Number(isNotHired))){
                return res.status(404).json({
                    status: 404,
                    message: "Query isHire is a number"
                })
            }
            const data = await RoomService.getAll(sort, type, Number(isNotHired), Number(allPhotos), Number(notPhoto), Number(page), Number(limit) );
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getAllRoomId(req, res){
        try {
          
            const data = await RoomService.getAllRoomId();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getRoomById(req, res){
        try {
            const roomId = req.params.id;
            const data= await RoomService.getRoomById(roomId);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

   


}

module.exports = new RoomController;