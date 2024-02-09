const express = require("express")
const { productId, getProduct } = require("../controlers/productControler")
const router = express.Router()
const {isAuthenticateUser} = require("../middleware/isAuthenticateUser")
router.route("/product").get( getProduct)
router.route("/product/:id").get(productId)

module.exports = router
