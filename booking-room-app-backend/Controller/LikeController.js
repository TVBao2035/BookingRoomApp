const createLikeDTO = require("../DTOs/liekDTO/createLikeDTO");
const deleteLikeDTO = require("../DTOs/liekDTO/deleteLikeDTO");
const LikeService = require("../Service/LikeService");

class LikeController{
    async delete(req, res){
        try {
            console.log(req.query);
            const {error, value} = deleteLikeDTO.validate(req.query);

            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const data = await LikeService.delete(value);
            res.status(200).json(data);
        } catch (error) {
            res.status(404).json(error);
            console.log(error);
        }
    }
    async create(req, res){
        try {
            const {error, value} = createLikeDTO.validate(req.body);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const data = await LikeService.create(value);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getAllByCommentId(req, res){
        try {
            const commentId = req.params.id;
            const data = await LikeService.getAllByCommentId(commentId);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
}

module.exports = new LikeController;