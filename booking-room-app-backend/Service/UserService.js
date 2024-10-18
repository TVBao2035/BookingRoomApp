const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Op, } = require('sequelize');
require('dotenv').config();
class UserService{
    
    create(user){
        return new Promise(async(resolve, reject) => {
            try {
                const checkPhone = await db.User.findOne({
                    where: {
                        phone: user.phone
                    }
                });

                if (checkPhone){
                    return resolve({
                        status: 409,
                        message: `Phone Number Already Exist!`,
                        data: `phone`
                    })
                }
                const checkEmail = await db.User.findOne({
                    where: {
                        email: user.email
                    }
                });

                if(checkEmail){
                    return resolve({
                        status: 409,
                        message: `Email Already Exist!`,
                        data: `email`
                    })
                }
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(user.password, salt);
                user.password = hashPassword;
                await db.User.create(user);

                resolve({
                    status: 200,
                    message: `Create User Success!!`,
                })

                
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create User!!! ${error}`
                })
            }
        })
    }
    
    delete(userId){
        return new Promise(async (resolve, reject) => {
            try {
                const user = await db.User.findOne({where: {id: userId}});

                if(!user){
                    return reject({
                        status: 404,
                        message: `Not Found User !!!`
                    })
                }

                const contract = await db.Contract.findAll({
                    where:{
                        userId: user.id
                    }
                })

                if(contract){
                    await db.Contract.destroy({
                        where: {
                            userId: user.id
                        }
                    })
                }
                await db.User.destroy({
                    where: {id : userId}
                })

                resolve({
                    status: 200,
                    message: `Delete User Success!!`
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Delete User !!! ${error}`
                })
            }
        })
    }

    update(data){
        return new Promise(async(resolve, reject) => {
        
            try {
                const user = await db.User.findOne(
                { 
                    where: {
                        id: data?.id
                    }   
                });

              
                if (!user){
                    return resolve({
                        status: 404,
                        message: "Not Found User !!!"
                    })
                } 
                // Update some fields
                user.email  = data.email;
                user.phone = data.phone;
                user.avatar = data.avatar;
                user.groupId = data.groupId;
                user.IDentify = data.IDentify;
                user.name = data.name;
                await user.save();
                
                resolve({
                    status: 200,
                    message: "Update User Sucess",
                });
               
            } catch (error) {
                reject({
                    status: 404,
                    message: `Update User is invalid ${error}`
                })
            }
        })
    }

    getAll(){
        const offset = ((page-1)*limit)
        return new Promise( async (resolve, reject) => {
            try {
             
                const data = await db.User.findAll();
                
                resolve({
                    status: 200,
                    message: "Success!",
                    data
                })
               
            } catch (error) {
                reject({
                    status: 404,
                    message:`Error Methob getAllUsers ${error}`
                })
            }
        })
    }
    
    getDetails(userId){
        return new Promise( async(resolve, reject) => {
            try {
                const data = await db.User.findOne({
                    where: {id: userId},
                    attributes: [['id', 'userId'], 'name', 'email', 'phone'],
                    include: [
                        {
                            model: db.Contract,
                            attributes: [['id', 'contractId'], 'duration'],
                            include: {
                                model: db.Room,
                                attributes: [['id', 'roomId'], 'price', 'description', ['photoId', 'backgroundPhoto']],
                                include: {
                                    model: db.Photo,
                                    attributes: [['id', 'photoId'], 'link']
                                }
                            }
                        },
                        {
                            model: db.Group,
                            attributes: [['id', 'groupId'], 'groupName', 'description'],
                        }
                    ]
                });

                if(data){
                    return resolve({
                        status: 200,
                        message: "Success!",
                        data
                    })
                }
                resolve({
                    status: 404,
                    message: "Not found user! with id: " + userId,
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Method getDetailsUser ${error}`
                })
            }
        })
    }

    getUserByEmail(email){
        return new Promise(async(resolve, reject)=> {
            try {
                const user = await db.User.findOne({
                    where: {email: email},
                    attributes: ['id','phone','email','name', 'avatar', 'IDentify', 'createdAt'],
                });
                if(!user){
                    return resolve({
                        status: 404,
                        message: "User is not existing!!"
                    })
                }
                resolve({
                    status: 200,
                    message: "Find user by email is success!!",
                    data: user
                })
                
            } catch (error) {
                reject({
                    status: 404,
                    message: error
                })
            }
        })
    }

    getUserByGroupId(groupId, limit, page){
        const offset = ((page-1)*limit);
        return new Promise(async(resolve, reject) => {
            try {
                const {count, rows} = await db.User.findAndCountAll({
                    where: { groupId }, 
                });
                const users = await db.User.findAll({
                    where: {groupId}, 
                    attributes: {exclude: ['password']},
                    limit: limit,
                    offset: offset
                });
                const total = parseInt(count/limit) + (count%limit === 0 ? 0 : 1);
                resolve({
                    status: 200,
                    message: "GET USER BY GROUP ID SUCCESS!!",
                    data: {
                        totalPage: total ,
                        currentPage: page,
                        isNext: page < total,
                        isPrevious: page > 1,
                        users
                    }
                });
            } catch (error) {
                reject({
                    status: 404,
                    message:`ERROR GET USER BY GROUP ID !! ${error}`
                });
            }
        })
    }
    
    refresh(data){
        return new Promise(async(resolve, reject) => {
            try {
                const user = await db.User.findOne({where: {email: data.user.email}});

                if(!user){
                    return resolve({
                        status: 404,
                        message: "User is not existing!!"
                    })
                }
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    groupId: user.groupId,
                    avatar: user.avatar
                }, process.env.ACCESS_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN});

               
                return resolve({
                    status: 200,
                    message: "refresh Success!",
                    data: {
                        token: accessToken,
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        groupId: user.groupId,
                        avatar: user.avatar
                    }
                })
            } catch (error) {
                reject({
                    status: 403,
                    message: `Refresh Failure! ${error}`
                })
            }
        })
    }

    signIn(data){
        return new Promise( async (resolve, reject) => {
            try {
                const { email, password } = data;

                const user = await db.User.findOne({
                    where: {email},
                    attributes: ['name', 'id', 'email', 'phone', 'groupId', 'password', 'avatar'],
                });

                if (!user) {
                    return resolve({
                        status: 404,
                        message: "Account is not register!",
                        data: 'email'
                    });
                }
                const checkPassword = bcrypt.compareSync(password, user.password);
            
                if (!checkPassword) {
                    return resolve({
                        status: 404,
                        message: "Password is wrong!",
                        data: 'password'
                    });
                }
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    groupId: user.groupId,
                    avatar: user.avatar
                }, process.env.ACCESS_TOKEN, { expiresIn: process.env.EXPIRE_TOKEN });

                resolve({
                    status: 200,
                    message: "Sign In Success!",
                    data: {
                        token:accessToken,
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        phone: user.phone,
                        groupId: user.groupId,
                        avatar: user.avatar
                    }
                })
            } catch (error) {
                console.log(error);
                reject({
                    status: 404,
                    message: `Sign In Failure! ${error}`,
                })
            }
        })
    }

    signUp(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data);
                const checkPhone = await db.User.findOne({
                    where: {
                        phone: data.phone
                    }
                });

                if (checkPhone) {
                    return resolve({
                        status: 409,
                        message: `Phone Number Already Exist!`,
                        data: `phone`
                    })
                }
                const checkEmail = await db.User.findOne({
                    where: {
                        email: data.email
                    }
                });

                if (checkEmail) {
                    return resolve({
                        status: 409,
                        message: `Email Already Exist!`,
                        data: `email`
                    })
                }

                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(data.password, salt);
                data.password = hashPassword;
                data.groupId = 3;
                await db.User.create(data);
                resolve({
                    status: 200,
                    message: "Create User Success!"
                })
            } catch (error) {
                reject({
                    status: 404,
                    message: `Error Create User! ${error}`
                })
            }
        })
    }


   
}

module.exports = new UserService;