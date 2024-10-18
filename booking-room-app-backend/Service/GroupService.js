const db = require('../models');
class GroupService{
    getAll(){
        return new Promise(async(resolve, reject) => {
            try {
                const data = await db.Group.findAll();

                resolve({
                    status: 200,
                    message: "Get All Group Success!",
                    data
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Get All Group ${error}`
                })
            }
        })
    }
}

module.exports = new GroupService;