const createPhotoDTO = require('../DTOs/photoDTO/createPhotoDTO.js');
const updatePhotoDTO = require('../DTOs/photoDTO/updatePhotoDTO.js');
const PhotoService = require('../Service/PhotoService.js');

class PhotoController{
    async create(req, res){
        try {
            const {error, value} = createPhotoDTO.validate(req.body);
            if(error){
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                    data: error.details[0].path[0]
                })
            }

            const data = await PhotoService.create(value);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async update(req, res){
        try {
            const {error, value} = updatePhotoDTO.validate(req.body);

            if(error){
                return res.status(200).json({
                    status: 404,
                    message: "Photo Fields is invalid "
                })
            }

            const data = await PhotoService.update(value);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async delete(req, res){
        try {
            const photoId = req.params.id;
            const data = await PhotoService.delete(photoId);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getAll(req, res){
        try {
            const {roomId, limit=5, page=1} = req.query;
            const data = await PhotoService.getAll(roomId, Number(limit), Number(page));
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error)
        }
    }
}
module.exports = new PhotoController;