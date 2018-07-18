const jwt = require('jsonwebtoken');
const staticvar = require('../api/nodemon.json');
module.exports = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
       console.log(jwt.verify(token, staticvar.env.JWT_KEY));
        console.log("how to");
        const decoded = jwt.verify(token, staticvar.env.JWT_KEY);
        console.log(decoded);

        //req.userData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            err: "Auth failed"
        });
    }
    
}