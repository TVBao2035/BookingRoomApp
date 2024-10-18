const db = require('../models');
class PhotoService{

    create(photo){
        return new Promise(async(resolve, reject) => {
            try {
             
                await db.Photo.create(photo);
                resolve({
                    status: 200,
                    message:`Create Photo Success`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Photo!!! ${error}`
                })
            }
        })
    }
    update(data){
        return new Promise(async(resolve, reject)=> {
            try {
                const photo = await db.Photo.findOne( {
                    where: {
                        id: data.id
                    }
                });

                if (!photo){
                    return resolve({
                        status: 404,
                        message: "Not Found Photo !!"
                    })
                }

                const room = await db.Room.findOne({
                    where: {
                        id: data.roomId
                    }
                })
                if (!room) {
                    return resolve({
                        status: 404,
                        message: "Not Found Room !!"
                    })
                }

                photo.roomId = data.roomId;
                photo.link = data.link;
                await photo.save();
                resolve({
                    status: 200,
                    message: "Update Photo Success"
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `ERROR update photo from database ${error}`
                })
            }
        })
    }
    delete(photoId){
        return new Promise( async(resolve, reject) => {
            try {
                const photo = await db.Photo.findOne({
                    where: {
                        id: photoId
                    }
                });

                if(!photo){
                    return resolve({
                        status: 404,
                        message: `Not Found Photo!!`
                    })
                }

                const room = await db.Room.findAll({ where: { photoId: photo.id}});
               
                for(let i=0; i<room.length; i++){
                    room[i].photoId = null;
                    await room[i].save();
                }
               
                await db.Photo.destroy({
                    where: {
                        id: photoId
                    }
                });

                resolve({
                    status: 200,
                    message: `Delete Photo Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete Photo!! ${error}`
                })
            }
        })
    }
    getAll(roomId, limit, page){
        const config = roomId ? {roomId} : {};
        var offset = (limit * (page - 1));
        if(isNaN(offset) || !offset)
        {
            offset = 0
        }

        return new Promise(async(resolve, reject) => {
            try {
                const {count, rows} = await db.Photo.findAndCountAll(
                    {
                        where: config,
                    });
                const photoData = await db.Photo.findAll(
                    {
                        where: config,
                        limit: limit,
                        offset: offset
                    }

                );
                if (!photoData){
                    return resolve({
                        status: 404,
                        message: "Not Found Photos"
                    })
                }

                const totalPage = parseInt(count / limit) + (count%limit === 0 ? 0 : 1);
               
                const data = {
                    totalPage: totalPage,
                    currentPage: page,
                    isNext: totalPage > page,
                    isPrevious: page > 1,
                    photoData,
                }
                resolve({
                    status: 200,
                    message: "Get All Photo Was Success!!",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error DataBase getAll Photo ${error}`
                })   
            }
        })
    }
}
module.exports = new PhotoService;