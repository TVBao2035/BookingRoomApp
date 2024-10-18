const { Sequelize, Op} = require('sequelize');
const db = require('../models');
class ContractService{
    checkExprised(){
        return new Promise(async (resovle, rejct) => {
            try {
                const data = await db.Contract.findAll({
                    attributes: ['id'],
                    where: {
                        endDate: {
                            [Op.lt]: new Date()
                        }
                    }
                })
                resovle({
                    status: 200,
                    message: "CHECK SUCCESS",
                    data
                })
            } catch (error) {
                rejct({
                    status: 404,
                    message: `Error Check Expreised  ${error}`,
                })
            }
        })
    }
    getAll(limit, page){
        const offset = (page-1) * limit;
        return new Promise( async (resolve ,reject)=> {
            try {
                const {count ,rows} = await db.Contract.findAndCountAll({
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'name', 'email', 'phone']
                        },
                        {
                            model: db.Room,
                            attributes: ['id', 'price'],
                            include: {
                                model: db.Photo,
                                attributes: ['link'],
                                // where: {
                                //     id: [Sequelize.col('Room.photoId')]
                                // }
                            }
                        }
                    ],
                });
                const contracts = await db.Contract.findAll({
                    attributes: ['id', 'startDate', 'endDate','sumMoney'],
                    include: [
                        {
                            model: db.User,
                            attributes: ['id', 'name', 'email', 'phone']
                        },
                        {
                            model: db.Room,
                            attributes: ['id', 'price'],
                            include: {
                                model: db.Photo,
                                attributes: ['link'],
                                // where: {
                                //     id: [Sequelize.col('Room.photoId')]
                                // }
                            }
                        }
                    ],
                    limit,
                    offset
                })

                const total = parseInt(rows.length/limit) + (rows.length%limit === 0 ? 0 : 1);

                resolve({
                    status: 200,
                    message: "Get All Contract Success!",
                    data: {
                        totalPage: total,
                        isNext: page < total,
                        isPrevious: page > 1,
                        currentPage: page,
                        contracts
                    }
                });
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Contract! ${error}`
                });
            }
        });
    }

    getContractByUserId(userId){
        return new Promise(async (resolve, reject)=> {
            try {
                const data = await db.Contract.findAll({
                    where: {
                        userId: userId
                    },
                    attributes: ['id', 'startDate', 'endDate', 'createdAt', 'sumMoney'],
                    include:[ {
                        model: db.User,
                        attributes: ['id', 'name', 'email', 'phone']
                    },{
                        model: db.Room,
                        attributes: ['price', 'id'],
                        include: {
                            model: db.Photo,
                            attributes: ['link'],
                            where: {
                                id: [Sequelize.col('Room.photoId')]
                            }
                        }
                    }]
                    
                });
                if(!data || data.length === 0){
                    return resolve({
                        status: 200,
                        message: "NOT FOUND CONTRACT OF USER",
                        data
                    })
                }


                resolve({
                    status: 200,
                    message: "GET ALL CONTRACTS OF USER SUCCESS!!",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `ERROR GET ALL CONTRACT OF USER ${error}`
                })
            }
        })
    }

    delete(contractId){
        return new Promise(async(resolve, reject) => {
            try {
                
                
                await db.Contract.destroy({
                    where: {
                        id: contractId
                    }
                })

                resolve({
                    status: 200,
                    message: "Cancle Contract Success!!!"
                })
            } catch (error) {
                reject({
                    status: 200,
                    message: `Cancle Contract Error!!! ${error}`
                })
            }
        })
    }

    create({userId, email=null, phone=null, sales, roomId, startDate, endDate}){
        return new Promise(async(resolve, reject) => {
            console.log(">>>>>>>>", userId, email, phone);
            try {
                const checkRoom = await db.Contract.findOne({
                    where: {
                        roomId
                    }
                });
                
                if (checkRoom){
                    return resolve({
                        status: 404,
                        message: "Room is hired"
                    })
                }
                const user = await db.User.findOne({
                    where: {
                        [Op.or]: [
                            {id: userId},
                            {email},
                            {phone}
                        ]
                    }
                })
        
                if (!user){
                    return resolve({
                        status: 404,
                        message: "Not Found User!!"
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
                        message: "Not Found Room!!"
                    })
                }
                // Calculator sumMoney
                const duration = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000));
                const sumMoney = (duration * room.price * ( 1 - (sales/100)));
                console.log(sumMoney, sales);
                // Create Contract
                const data = await db.Contract.create({
                    roomId,
                    userId: user.id,
                    sumMoney,
                    startDate,
                    endDate
                });

                // Create History
                await db.History.create({
                    userId: user.id,
                    roomId: roomId,
                    duration: duration,
                    sumMoney: sumMoney,
                    startDate: startDate,
                    endDate: endDate
                })
              
                resolve({
                    status: 200,
                    message: "Create Contract Success",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Create Contract Failure ${error}`,
                })
            }
        })
    }

    update(id, value){
        return new Promise(async (resolve, reject) => {
            try {
                const contract = await db.Contract.findOne({
                    where: {id}
                })
                if (!contract){
                    return resolve ({
                        status: 404,
                        message: "Not Found Contract !!!"
                    })
                }
                const roomModel = await db.Room.findOne({
                    where: {
                        id: value.roomId
                    }
                })

                if (!roomModel) {
                    return resolve({
                        status: 404,
                        message: "Not Found Room !!!"
                    })
                }

                if(contract.roomId !== roomModel.id){
                    const checkRoomHire = await db.Contract.findOne({
                        where: {
                            roomId: value.roomId
                        }
                    })
    
                    if(checkRoomHire){
                        return resolve({
                            status: 404,
                            message: `Room Is Hired!!`
                        })
                    }
                }

                // Calculator sumMoney
                const duration = Math.ceil((new Date(value.endDate).getTime() - new Date(value.startDate).getTime()) / (24 * 60 * 60 * 1000));
                const sale = value.sales ? value.sales : 0;
                const sumMoney = (duration * roomModel.price) - (duration * roomModel.price * (sale/100));
                // Update some fields
                contract.roomId = value.roomId;
                contract.startDate = value.startDate;
                contract.endDate = value.endDate;
                contract.sumMoney = sumMoney;
                await contract.save();

                resolve({
                    status: 200,
                    message: "Update Contract Success !!!"
                });
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error DataBase Update Contract !!! ${error}`
                })
            }
        })
    }
}

module.exports = new ContractService;