const { Op, where } = require("sequelize");
const { message } = require("../DTOs/userDTO/signUpDTO");
const db = require("../models");

class RoomServiceService{
    update({serviceId, roomId, id}){
        return new Promise( async (resolve, reject) => {
            try {
                const service = await db.Service.findOne({
                    where: {
                        [Op.and]: [
                            { id: serviceId },
                            { isDelete: false }
                        ]
                    }
                });

                if (!service) {
                    return resolve({
                        status: 404,
                        message: `Service Id Not Found!!`
                    })
                }

                const room = await db.Room.findOne({
                    where: {
                        id: roomId
                    }
                })

                if (!room) {
                    return resolve({
                        status: 404,
                        message: `Not Found Room With ID: ${roomId}`
                    })
                }

                const roomService = await db.Room_Service.findOne({
                    where: {id}
                })
                if(!roomService){
                    return resolve({
                        status: 404,
                        message: `Not Found Room Service With ID: ${id}`
                    })
                }

                await db.Room_Service.update({serviceId, roomId}, {where: {id}})
     
                resolve({
                    status: 200,
                    message: `Update Room Service Success!!!`
                })
 
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Update Room Service ${error}`
                })
            }
        })
    }

    delete(id){
        return new Promise(async (resolve, reject) => {
            try {
                const roomService = await db.Room_Service.findOne({
                    where: { id }
                })

                if(!roomService){
                    return resolve({
                        status: 404,
                        message: `Not Found Room Service With ID: ${id}`
                    })
                }

                await roomService.destroy();
                resolve({
                    status: 200,
                    message: `Delete Room Service Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete Room Servcie ${error}`
                })
            }
        })
    }

    create({serviceId, roomId}){
        return new Promise(async (resolve, reject) => {
            try {
               const service = await db.Service.findOne({
                where:{
                    [Op.and]:[
                        { id: serviceId },
                        { isDelete: false}
                    ]
                }
               });

               if(!service){
                return resolve({
                    status: 404,
                    message: `Service Id Not Found!!`
                })
               }

               const room = await db.Room.findOne({
                where: {
                    id: roomId
                }
               })

               if(!room){
                   return resolve({
                       status: 404,
                       message: `Not Found Room With ID: ${roomId}`
                   })
               }
               console.log({serviceId, roomId});
               await db.Room_Service.create({serviceId, roomId});
               resolve({
                status: 200,
                message: `Create Room Service Success!!`
               })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Room Service ${error}`
                })
            }
        })
    }
  
    getAll(page, limit){
        const offset = (page-1)*limit;
        return new Promise(async (resolve, reject) => {
            try {
                const {count, rows} = await db.Room_Service.findAndCountAll();
                const roomService = await db.Room_Service.findAll({
                    attributes: ['id', 'serviceId', 'roomId'],
                    offset,
                    limit
                });
                const total = parseInt(count / limit) + (count % limit === 0 ? 0 : 1);
                resolve({
                    status: 200,
                    message: `Get All Room Service Success`,
                    data:{
                        totalPage: total,
                        currentPage: page,
                        isNext: page < total,
                        isPrevious: page > 1,
                        roomService
                    }
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Room Service ${error}`
                })
            }
        })
    }
}

module.exports = new RoomServiceService;