const tokenService = require('../service/token-service');
const User = require('../models/User');
async function checkIfAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json('You are not authenticated');
    }
    const accessToken = authHeader.split(' ')[1];
    //console.log(accessToken);
    if(!accessToken) {
        return res.status(401).json('You are not authenticated');
    }
    try {
        const user = tokenService.verifyAccessToken(accessToken);
        req.user = user;
        //console.log(user);
        next();
    } catch (err) {
        return res.status(401).json('Invalid token mid.')
    }
}

module.exports = checkIfAuth;