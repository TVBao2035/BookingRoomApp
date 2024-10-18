const { Op } = require("sequelize");
const db = require("../models");

class HistoryService {
    getRevenueOfEachRoom(){
        return new Promise(async (resolve, reject) => {
            try {
                const allRooms = await db.Room.findAll();
                const allHistories = await db.History.findAll();


                var test = [];
                for (let room of allRooms) {
                    test[room.id - 1] = {
                        title: `Room-${room.id}`,
                        sumMoney: 0
                    }
                }

                for(let history of allHistories){
                    test[history.roomId - 1].sumMoney += parseInt(history.sumMoney);
                }

                resolve({
                    status: 200,
                    message: `Get Revenue Of Each Rooms Success!!!`,
                    data: test
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get Revenue Of Each Rooms!!! ${error}`,
                })
            }
        })
    }
    getRevenueOfAllRoomsEachMonth(year){
        const yearString = `${year}%`;
        return new Promise(async (resolve, reject) => {
            try {
                const allRooms = await db.Room.findAll();
                const allHistories = await db.History.findAll({
                    where: {
                        startDate: {
                            [Op.like]: yearString
                        }
                    }
                });


                var test = [];
                for(let room of allRooms){
                    test[room.id-1] = {
                        title: `Room-${room.id}`,
                        sumMoneyOfEachMonth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                }

                for(let history of allHistories){
                    let month = parseInt(history.startDate.split('-')[1]);
                    test[history.roomId -1].sumMoneyOfEachMonth[month-1] += parseInt(history.sumMoney);
                }

                resolve({
                    status: 200,
                    message: `Get Revenue Of All Rooms Each Month Success!!!`,
                    data: test
                })
               
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get Revenue Of All Rooms Each Month!!! ${error}`,
                })
            }
        })
    }
    getAll({limit=5, page=1, date}){
        var offset = (parseInt(limit) * (parseInt(page) - 1));
        if (isNaN(offset) || !offset) {
            offset = 0
        }
        var configWhere = {};
        if(date) {
            const stringDate = `${date}%`;
            configWhere = {
                startDate: {
                    [Op.like]: stringDate
                }
            }
        }
        
        return new Promise(async(resolve, reject) => {
            try {

                const {count ,rows} = await db.History.findAndCountAll({
                    where: configWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: db.User,
                        attributes: ['id', 'name', 'phone', 'email']
                    },
                });
                const totalPage = ( parseInt(count / limit) + (count % limit === 0 ? 0 : 1)) ;
                if(page > totalPage) offset = 0;
                
                const histories = await db.History.findAll({
                    where: configWhere,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: {
                        model: db.User,
                        attributes: ['id', 'name', 'phone', 'email']
                    },
                    offset: parseInt(offset),
                    limit: parseInt(limit)
                });

             
            
                const data = {
                    totalPage: totalPage,
                    currentPage:  page <= totalPage ? page : 1,
                    isNext: totalPage > page,
                    isPrevious:( page <= totalPage) && (page > 1),
                    data: histories
                }
                resolve({
                    status: 200,
                    message: `Get All History Success !!!`,
                    data: data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All History: ${error}`
                })
            }
        })
    }

    getHistoryByUserId(userId, month, year){
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
                        message: `Not Found User!!!`
                    })
                }

                const data = await db.History.findAll({
                    where: {
                        userId,
                    }
                })
                var newData = [];
                if(month && year){
                    for(let i of data)
                    {
                        let start = i.startDate.split('-');
                        let end = i.endDate.split('-');
                        if (
                            (parseInt(start[0]) === parseInt(year) && parseInt(start[1]) === parseInt(month))
                            || (parseInt(end[0]) === parseInt(year) && parseInt(end[1]) == parseInt(month))
                        )
                        newData.push(i)
                    }
                }else newData = data
                resolve({
                    status: 200,
                    message: `Get All History By User Id`,
                    data: newData
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Gel History By User: ${error}`
                })
            }
        })
    }
}

module.exports = new HistoryService;