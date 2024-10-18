const createUserDTO = require("../DTOs/userDTO/signUpDTO");
const signInDTO = require("../DTOs/userDTO/signInDTO");
const UserService = require("../Service/UserService");

const updateUserDTO = require("../DTOs/userDTO/updateUserDTO");
const signUpDTO = require("../DTOs/userDTO/signUpDTO");
require('dotenv').config();

class UserController {

    async create(req, res){
        try {
            const {groupId, IDentify,...report} = req.body;
            const { error, value } = createUserDTO.validate(report);
         
            if(error){
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                    data: error.details[0].path[0]
                })
            }
            
            value.groupId = groupId;
            value.IDentify = IDentify;
            const data = await UserService.create(value);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async update(req, res){
        try {
            const {error, value} = updateUserDTO.validate(req.body);
            if(error){
                return res.status(200).json({
                    status: 404,
                    message: error.message
                })
            }
           
            const data = await UserService.update(value);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async delete(req, res){
        try {
            const userId = req.params.id;
            const data = await UserService.delete(userId);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);   
        }
    }

    async getAll(req, res) {
        try {
        
            const data = await UserService.getAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async getDetails(req, res){
        try {
            const userId = Number(req.params.id);
            if(userId){
                console.log(userId);
                const data = await UserService.getDetails(userId);
                return res.status(200).json(data);
            }
            return res.status(200).json({
                status: 200,
                message: "Param id is a Number!"
            })
        } catch (error) {
            console.log(error);
            res.status(404).json(error);

        }
    }

    async getUserByEmail(req, res){
        try {
            const { email } = req.body;
            if (!email || !(/^([A-Za-z0-9\.])+\@([A-Za-z0-9])+\.([A-Za-z]{2,4})$/).test(email)) {
                return res.status(200).json({
                    status: 404,
                    message: "Email is invalid",
                    data: 'email'
                });
            }

            const data = await UserService.getUserByEmail(email);

            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
    
    async getUserByGroupId(req, res){
        try {
            const {limit=5, page=1} = req.query;
            const groupId = req.params?.groupId;
            if(!groupId){
                return res.status(200).json({
                    status: 404,
                    message: "Param is invalid"
                });
            }
            const data = await UserService.getUserByGroupId(groupId, Number(limit), Number(page));
            if(!data){
                return res.status(200).json({
                    status: 404,
                    message: "There is no Group with id: " + groupId
                });
            }

            res.status(200).json(data);
        } catch (error) {
            res.status(404).json(error);
        }
    }

    async refresh(req, res){
        try {
            const {token, decode} = req.user;
            const data = await UserService.refresh({ user: decode, token:token});
            let timestamp = Number(process.env.TIMESTAMP) * 1000;
            return res.cookie('token', data.data?.token, {
                httpOnly: true,
                sameSite: 'none',
                expires: new Date(Date.now() + timestamp),
                secure: true,
           
            }).status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(403).json(error);
        }
    }

    async logOut(req, res){
        try {
           
            return res.clearCookie('token').status(200).json({
                status: 200,
                message: "Log out success"
            });
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    async signUp(req, res){
        try{
            const {error, value} = signUpDTO.validate(req.body);
            console.log(value);
            if(error){
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                    data: error.details[0].path[0]
                })
            }
          
    
            const data = await UserService.signUp(value);

            res.status(200).json(data)
            
        }catch(error){
            console.log(error);
            res.status(404).json(error)
        }
    }

    async signIn(req, res){
        try {
            const {error, value} = signInDTO.validate(req.body)
            if(error){
                return res.status(400).json({
                    status: 400,
                    message: error.message,
                    data: error.details[0].path[0]
                })
                
            }

         
        
            let timestamp = Number(process.env.TIMESTAMP) * 1000;

            const data = await UserService.signIn(value);
            res.cookie("token",data.data.token, {
                httpOnly: true,
                sameSite: 'none',
                expires: new Date(Date.now() + timestamp),
                secure: true
            }).status(200).json(data);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }
}
module.exports = new UserController;