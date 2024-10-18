const { Op } = require("sequelize");
const db = require("../models")

class LikeService {
    delete({userId, commentId}){
        return new Promise(async(resolve, reject) => {
            try {
                const like = await db.Like.findOne({
                    where: {
                       [Op.and]: [{userId}, {commentId}]
                    }
                })
                if(!like){
                    return resolve({
                        status: 404,
                        message: `Not Found Like `
                    })
                }

                await like.destroy();
                resolve({
                    status: 200,
                    message: `Delete Like Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete Like ${error}`
                })
            }
        })
    }
    create({userId, commentId}){
        return new Promise(async(resolve, reject) => {
            try {
                const user = await db.User.findOne({
                    where: {
                        id: userId
                    }
                })
                if(!user){
                    return resolve({
                        status: 404,
                        message: `Not Found User With Id ${userId}`
                    })
                }

                const comment = await db.Comment.findOne({
                    where: {
                        id: commentId
                    }
                })
                if(!comment){
                    return resolve({
                        status: 404,
                        message: `Not Found Comment With Id ${commentId}`
                    })
                }

                await db.Like.create({
                    userId,
                    commentId
                })

                resolve({
                    status: 200,
                    message: `Create Like Was Success!!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Like ${error}`
                })
            }
        })
    }
    getAllByCommentId(commentId){
        return new Promise(async(resolve, reject) => {
            try {
                const comment = await db.Comment.findOne({
                    where: {
                        id: commentId
                    },
                  
                })

                if(!comment){
                    return resolve({
                        status: 404,
                        message: `Not Found Comment With Id Is ${commentId}`,
                    })
                }
                const data = await db.Like.findAll({
                    where: {
                        commentId
                    }

                })

                resolve({
                    status: 200,
                    message: `Get All Like Of Comment Was Success!!!`,
                    data
                })

            } catch (error) {
                reject({
                    status: 404,
                    message: `Errer Get All Like Of Comment!!! ${error}`
                })
            }
        })
    }
}

module.exports = new LikeService;