const createCommentDTO = require("../DTOs/commentDTO/createCommentDTO");
const CommentService = require("../Service/CommentService");

class CommentController{
    async create(req, res){
        try {
            const { error, value } = createCommentDTO.validate(req.body);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const { message, userId, roomId, commentId } = value;

            const data = await CommentService.create({ message, userId, roomId, commentId });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getAll(req, res){
        try {
            const roomId = req.params.id;
            const data = await CommentService.getAll({roomId});
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }


}

module.exports = new CommentController;