const express = require("express")
const router = express.Router()
const authenticationMiddleware = require("../middleware/authentication")
const {
    getAllUsers,
    createUser,
    updateUserByID,
    deleteUserByID} = require("../controllers/user")

router.route("/").get(authenticationMiddleware, getAllUsers).post(createUser)
router.route("/:id").put(authenticationMiddleware, updateUserByID).delete(authenticationMiddleware, deleteUserByID)

module.exports = router