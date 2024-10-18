const GroupService = require("../Service/GroupService");

class GroupController{
    async getAll(req, res){
        try {
            const data = await GroupService.getAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }    
}

module.exports = new GroupController;