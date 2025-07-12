const express = require("express")
const {demo} = require("./v1")

const router = express.Router()


router.use("/v1", demo)

module.exports = router;