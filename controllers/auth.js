const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CustomAPIError = require("../error/customError")


const loginUser = async (req, res) => {

    const {email, password} = req.body

    if(!email ||!password){
        throw new CustomAPIError("Required fileds missing", 400)
    }

    const user = await User.findOne({where: {email}})
console.log(user)
    if(!user){
        throw new CustomAPIError("Invalid Email", 401)
    }

    const passwordMatch = bcrypt.compare(password, user.password)

    if(passwordMatch){        
        const token = jwt.sign(
                  {id: user.id, email: user.email}, 
                  process.env.JWT_SECRET, 
                  {expiresIn: process.env.JWT_EXP}
                )
        res.status(200).json({message:"login sucessfull", token})
    }else{
        throw new CustomAPIError("Invalid Password", 401)
    }

}

module.exports = {    
    loginUser
}