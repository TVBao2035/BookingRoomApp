const HistoryService = require("../Service/HistoryService");

class HistoryController{
    async getRevenueOfEachRoom(req, res){
        try {
            const data = await HistoryService.getRevenueOfEachRoom();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getRevenueOfAllRoomsEachMonth(req, res){
        try {
            const year = req.params.year;
            const data = await HistoryService.getRevenueOfAllRoomsEachMonth(year);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    
    async getAll(req, res){
        try {
            const {  limit=5, page=1, date } = req.query;
            const data = await HistoryService.getAll({ limit, page, date});
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getHistoryByUserId(req, res){
        try {
            const userId = req.params.id;
            const {month, year} = req.query;
            const data = await HistoryService.getHistoryByUserId(userId, month, year);
            res.status(200).json(data);
        } catch (error) {
            res.status(404).json(error);    
        }
    }   
}

module.exports = new HistoryController;