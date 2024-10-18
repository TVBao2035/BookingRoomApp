
const createContractDTO = require("../DTOs/contractDTO/createContractDTO");
const updateContractDTO = require("../DTOs/contractDTO/updateContractDTO");
const ContractService = require("../Service/ContractService");

class ContractController {
    async getAll (req, res){
        try {
            const {limit=5, page=1} = req.query;
            const data = await ContractService.getAll(Number(limit), Number(page));
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }   
    }

    async getContractByUserId(req, res){
        try {
            const userId = req.params.id;
            console.log("PARAMS USER ID >>>>>>", userId);
            const data = await ContractService.getContractByUserId(userId);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async delete(req, res){
        try {
            const contractId = req.params.id;
            const data = await ContractService.delete(contractId);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async create(req, res){
        try {
            const {error, value} = createContractDTO.validate(req.body);
           
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
            const { userId, roomId, startDate, endDate, email, phone, sales=0} = value;
            console.log(value);
            const data = await ContractService.create({userId, email, phone,roomId, startDate, endDate , sales});
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async update(req, res){
        try {
          
            const {error, value} = updateContractDTO.validate(req.body);
            const contractId = req.params?.id
            if (!contractId){
                return res.status(200).json({
                    status: 404,
                    message: "Contract Id is invalid"
                })
            }
            if(error){
                console.log(error);
                return res.status(200).json({
                    status: 404,
                    message: "Update Fields is invalid" + error
                })
            }
            const data = await ContractService.update(contractId, value);
        
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(404).json(error)
        }
    }
}

module.exports = new ContractController;