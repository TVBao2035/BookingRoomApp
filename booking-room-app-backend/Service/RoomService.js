const { Op, Sequelize, literal, where} = require('sequelize');
const db = require('../models');

class RoomService{

    create(room){
        return new Promise(async(resolve, reject) => {
            try {
               
                await db.Room.create(room);
                resolve({
                    status: 200,
                    message: `Create Room Success`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Room `
                })
            }
        })
    }
    delete(roomId){
        return new Promise(async (resolve, reject) => {
            try {
                const room = await db.Room.findOne({ where: {id: roomId}});
                if(!room){
                    return resolve({
                        status: 404,
                        message: `Not Found Room!!!`
                    })
                }
                const photo = await db.Photo.findOne({
                    where: {
                        id: room.photoId
                    }
                })

                if(photo){
                    photo.roomId = null
                    await photo.save()
                }

                const listPhoto = await db.Photo.findAll({
                    where: {roomId: room.id}
                })

                for(let i = 0; i< listPhoto.length; i++){
                    listPhoto[i].roomId = null;
                    await listPhoto[i].save();
                }
                
                await db.Room.destroy({where: {id: roomId}});
                resolve({
                    status: 200,
                    message: `Delete Room Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete Room!!`
                })
            }
        })
    }

    update(data){
        console.log(data);
        return new Promise(async (resolve, reject) => {
            try {
                const room = await db.Room.findOne(
                {
                    where: { id: data.id}
                });

                if(!room) {
                    return resolve({
                        status: 404,
                        message: "Not Found Room!!"
                    })
                }
                if(data.photoId){
                    const photo = await db.Photo.findOne({
                        where: {
                            id: data.photoId
                        }
                    });
                    if(!photo){
                        return resolve({
                            status: 404,
                            message: "Not Found Photo!!"
                        })
                    }
                }


                room.photoId = data.photoId;
                room.description = data.description;
                room.numberOfPeople = data.numberOfPeople;
                await room.save();
                resolve({
                    status: 200,
                    message: "Update Room Success!!"
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `ERROR update Room from database ${error}`
                })
            }
        })
    }

    getAll(sort='id', type='asc', isNotHired = 0, allPhotos = 0, notPhoto=1, page, limit){

        const offset = ((page-1)*limit);

        const configGetPhoto = allPhotos ? {} : {id: [Sequelize.col('Room.photoId')]};

        const configNotGetPhoto = notPhoto ? {} : {
            attributes: ['id', 'roomId', 'link'],
            where: configGetPhoto
        }

        const config = isNotHired ? {
            id: {
                [Op.notIn]: [
                    literal('SELECT `contracts`.roomId FROM `contracts`')
                ]
            }
        } : {};

        return new Promise(async (resolve, reject)=> {
            try {
                const {count, rows} = await db.Room.findAndCountAll({
                    include: [
                        {
                            model: db.Photo,
                            ...configNotGetPhoto
                        },
                       
                        {
                            model: db.Contract,

                        }
                    ],
                    where: config,
                })
                const rooms = await db.Room.findAll({
                    attributes: ['id', 'price', 'description', 'photoId', 'numberOfPeople'],
                
                    include: [
                        {
                            model: db.Photo,
                            ...configNotGetPhoto
                        },
                        {
                            model: db.Contract
                        },
                        {
                            model: db.Service
                        }
                    ],
                    order: [[sort, type]],
                    where: config,
                    limit,
                    offset,
                });
                const total = parseInt(rows.length / limit) + (rows.length %limit === 0 ? 0 : 1); 
                resolve({
                    status: 200,
                    message: "Get All Room Success!",
                    data: {
                        totalPage: total,
                        currentPage: page,
                        isNext: page < total,
                        isPrevious: page > 1,
                        rooms
                    }
                })
            } catch (error) {
                reject({
                    status: 404,
                    message:`Error Get All Room Success ${error}`
                })
            }
        })
    }

    getAllRoomId(){
        return new Promise(async (resolve, reject) => {
            try {
            
                const data = await db.Room.findAll({
                    attributes: ['id']
                });

                resolve({
                    status: 200,
                    message: "Get All Room Id Success!",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Room Id Success ${error}`,
        
                })
            }
        })
    }

    getRoomById(roomId){
        return new Promise( async (resolve, reject)=> {
            try {
                const data = await db.Room.findOne({
                    where: { id:roomId },
                    attributes: ['id', 'price', 'description', 'photoId', 'numberOfPeople'],
                    
                    include: [
                    {
                        model: db.Contract,
                        attributes: ['id']
                    },
                    {
                        model: db.Photo,
                        attributes: ['id', 'link', 'roomId']
                    },
                    {
                        model: db.Service,
                        attributes: ['id', 'name'],
                    }
                    ]
                    
                });
                if(!data) {
                    resolve({
                        status: 404,
                        message: `Not Found Room With Id = ${roomId} !!!`
                    })
                }
               
                resolve({
                    status: 200,
                    message: "Get Room By Id Success",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get Room !!! ${error}`
                })
            }
        })
    }

}

module.exports = new RoomService;