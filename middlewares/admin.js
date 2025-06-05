const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");


const adminMiddleware = (req, res, next) => {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_adminM_PASSWORD);

    if(decoded){
        req.adminId=decoded.id;
        next();
    } else{
        res.status(403).json({
            msg: "You are not signed in"
        })
    }
    
}  

module.exports = {
    adminMiddleware
}