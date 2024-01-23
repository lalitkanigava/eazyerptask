const CustomAPIError = require("../error/customError")

const customErrorHandlerMiddleware = (err, req, res, next) => {

if(err instanceof CustomAPIError){
    return res.status(err.statusCodes).json({msg: err.message})
}

res.status(500).send("Something Went wrong")

}

module.exports = customErrorHandlerMiddleware