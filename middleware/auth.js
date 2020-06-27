const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    
    //Get the token
    const token = req.header('x-auth-token');

    //Check if not token
    if(!token) return res.status(401).json({ msg: 'No token provided'})

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token is invalid'})
    }
}