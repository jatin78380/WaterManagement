const jwt = require('jsonwebtoken');
 function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
    const words = token.split;
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,'secret');

    if(decodedValue.username){
        req.username= decodedValue.username;
        next();
    }
    else{
        res.status(403).json({
            msg: "You are not authorized to access this route"
        })
    }
}
module.exports = adminMiddleware;