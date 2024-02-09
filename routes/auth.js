const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassord, getUserProfile, changePassword, updateProfile } = require("../controlers/authController");
const {isAuthenticateUser} = require("../middleware/isAuthenticateUser")
const router = express.Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassord)
router.route('/myprofile').get(isAuthenticateUser,getUserProfile)
router.route('/password/change').put(isAuthenticateUser,changePassword)
router.route('/update').put(isAuthenticateUser,updateProfile)



module.exports = router

