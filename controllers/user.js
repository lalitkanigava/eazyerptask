const User = require('../model/user')
const CustomAPIError = require("../error/customError")
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {

    const users = await User.findAll()
    res.status(200).json(users)

}
const createUser = async (req, res) => {

    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName ||!email ||!password){
        throw new CustomAPIError("Required fileds missing", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await User.create({firstName, lastName, email, password:hashedPassword})

    if(!createdUser){
        throw new CustomAPIError("something went wrong", 500)
    }

    res.status(200).json(createdUser)

}

const updateUserByID = async (req, res) =>{

    const userId = req.params.id
    
    if(userId == ""){
        throw new CustomAPIError('user id required', 401)
    }

    const [updatedRows, [updatedUser]] = await User.update(req.body, {where: {id: userId}, returning: true})

    if(updatedRows === 0){
        throw new CustomAPIError("user not found", 404)
    }

    const userwithoutpass = Object.assign({}, updatedUser.dataValues);
    delete userwithoutpass.password;


    res.status(201).json(userwithoutpass)

}

const deleteUserByID = async (req, res) =>{
    const userId = req.params.id
    
    if(userId == ""){
        throw new CustomAPIError('user id required', 401)
    }

    const deletedRows = await User.destroy({where: {id: userId}})

    if(deletedRows === 0){
        throw new CustomAPIError("user not found", 404)
    }

    res.status(201).json({message: "User Deleted"})
}

module.exports = {
    getAllUsers,
    createUser,
    updateUserByID,
    deleteUserByID
}