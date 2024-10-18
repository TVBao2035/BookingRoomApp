const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    const tokenHeader = req.headers?.authorization?.split(' ')[1];
    const token = tokenHeader ? tokenHeader : tokenCookie;


    if (!token){
        return res.status(401).json({
            status: 401,
            message: "Please Sign In!!!!#",
        });
    }
    console.log(">>> token");
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = {
            decode: decode,
            token: token
        };
       
        next()
    } catch (error) {
        res.status(403).json({
            status: 403,
            message: "Token is Invalid!"
        });
    }
        
}

module.exports = checkToken;