const createServiceDTO = require("../DTOs/serviceDTO/createServiceDTO");
const updateServiceDTO = require("../DTOs/serviceDTO/updateServiceDTO");
const ServiceService = require("../Service/ServiceService");

class ServiceController{
    async delete(req, res){
        try {
            const id = req.params.id;
            const data = await ServiceService.delete(id);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async update(req, res){
        try {
            console.log(req.body);
            const {error, value} = updateServiceDTO.validate(req.body);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const data = await ServiceService.update(value);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async create(req, res){
        try {
            const {error, value} = createServiceDTO.validate(req.body.name);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const {name} = value;
            const data = await ServiceService.create(name);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getAllServiceWithIdName(req, res){
        try {
            const data = await ServiceService.getAllServiceWithIdName();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    async getAll(req, res){
        try {
            const {limit=5, page=1} = req.query;
            const data = await ServiceService.getAll(Number(page), Number(limit));
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
}

module.exports = new ServiceController;