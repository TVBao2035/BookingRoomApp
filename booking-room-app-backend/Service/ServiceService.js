const { Op } = require('sequelize');
const db = require('../models');
class ServiceService
{
    delete(id){
        return new Promise(async (resolve, reject) => {
            try {
                const service = await db.Service.findOne({
                    where: {
                        [Op.and]: [{id}, {isDelete: false}]
                    }
                })

                if(!service){
                    return resolve({
                        status: 404,
                        message: `Not Found Service with Id = ${id}`
                    })
                }

                service.isDelete = true;
                await service.save();
                resolve({
                    status: 200,
                    message: `Delete Service Success!!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete Service ${error}`
                })
            }
        })
    }
    update({id, name}){
        return new Promise(async(resolve, reject) => {
            try {
                const service = await db.Service.findOne({
                    where: {
                        [Op.and]: [{id}, {isDelete: false}]
                    }
                });
                if(!service){
                    return resolve({
                        status: 404,
                        message: `Not Found Service with Id = ${id}`
                    })
                }
                service.name = name;
                await service.save();
                resolve({
                    status: 200,
                    message: `Update Service Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Update Service ${error}`
                })
            }
        })
    }
    create(name){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await db.Service.create({
                    name
                });

                resolve({
                    status: 200,
                    message: `Create Service Success!!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create Service ${error}`,
                })
            }
        })
    }
    getAllServiceWithIdName(){
        return new Promise(async(resolve, reject) => {
            try {
                const data  = await db.Service.findAll({
                    where: {
                        isDelete: false
                    },
                    attributes: ['id', 'name']
                });

                resolve({
                    status: 200,
                    message: `Get All Service With Id And Name`,
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Service With Id And Name`
                })
            }
        })
    }
    getAll(page, limit){
        const offset = (page-1)*limit;
        return new Promise(async(resolve, reject) => {
            try {
                const {count ,rows} = await db.Service.findAndCountAll({
                    where: {
                        isDelete: false
                    }
                });
                const services = await db.Service.findAll({
                    where: {
                        isDelete: false
                    },
                    offset,
                    limit
                });
                const total =   parseInt(count/limit) + (count%limit === 0 ? 0 : 1);
                resolve({
                    status: 200,
                    message: `Get All Services Success!!`,
                    data : {
                        totalPage: total,
                        currentPage: page,
                        isNext: page<total,
                        isPrevious: page > 1,
                        services
                    }
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Services ${error}`
                })
            }
        })
    }
}

module.exports = new ServiceService;