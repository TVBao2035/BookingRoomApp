const { Op } = require("sequelize");
const db = require("../models");

class CommnetService {
    create({message, userId, commentId, roomId}){
        return new Promise(async(resolve, reject) => {
            try {
                const user = await db.User.findOne({
                    where: {id: userId}
                });
                if(!user){
                    return resolve({
                        status: 404,
                        message:  `Not Found User!!`,
                    })
                }

                const room = await db.Room.findOne({
                    where: {
                        id: roomId
                    }
                });

                if(!room){
                    return resolve({
                        status: 404,
                        message: `Not Found Room!!!`
                    })
                }

                if(commentId!==0){
                    const comment = await db.Comment.findOne({
                        where: {
                            id: commentId
                        }
                    });
                    if(!comment){
                        return resolve({
                            status: 404,
                            message: `Not Found Comment!!!`
                        })
                    }
                }


                await db.Comment.create({roomId, userId, commentId, message});

                resolve({
                    status: 200,
                    message: `Create Comment Success !!!!`
                })

            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Comment ${error}`,
                })
            }
        })
    }

    getAll({roomId }){

        let loop = 6;
        const config = (loop) => {
            if(loop === 0) 
                return {
                            model: db.Comment,
                            as: 'children',
                            attributes: ['message', 'id'],
                            include: [
                                {
                                    model: db.User,
                                    attributes: ['avatar', 'name']
                                },
                                {
                                    model: db.Like,
                                    as: 'likes',
                                    attributes: ['id', 'userId']
                                }
                            ],
                            order: [["createdAt", "DESC"]],
                        };
            loop--;
            return {
                        model: db.Comment,
                        as: 'children',
                        attributes: ['message', 'id'],
                        include: [
                            config(loop), 
                            {
                                model: db.User,
                                attributes: ['avatar', 'name']
                            },
                            {
                                model: db.Like,
                                as: 'likes',
                                attributes: ['id', 'userId']
                            }
                        ],
                        order: [["createdAt", "DESC"]],
                    }
        }
        return new Promise(async(resolve, reject) => {
            try {
                const room = await db.Room.findOne({
                    where: {
                        id: roomId
                    }
                })

                if(!room){
                    return resolve({
                        status: 404,
                        message: `Not Found Room With Id: ${roomId}`
                    })
                }

                const data = await db.Comment.findAll({
                    where: {
                        [Op.and]: [
                            {commentId: 0},
                            {roomId}
                        ]

                    },
                    attributes: ['message', 'id'],
                    include: [
                        config(loop),
                        {
                            model: db.User,
                            attributes:['avatar', 'name']
                        },
                        {
                            model: db.Like,
                            as: 'likes',
                            attributes: ['id', 'userId']
                        }
                    ],
                    order: [["createdAt", "DESC"]],
                });
                resolve({
                    status: 200,
                    message: `Get All Comment Success!!`,
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Commnet ${error}`
                })
            }
        })
    }

   
     
}

module.exports = new CommnetService;