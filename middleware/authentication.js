const jwt = require('jsonwebtoken')
const CustomAPIError = require('../error/customError')

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No Token provided', 401)
    }

    const token = authHeader.split(' ')[1]

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        let {id, username} = decode
        req.user = {id, username}
        next()
    } catch(error){
        throw new CustomAPIError('Invalid token provided', 401)
    }
}

module.exports = authenticationMiddleware