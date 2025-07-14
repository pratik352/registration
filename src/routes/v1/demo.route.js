const express = require("express");
const { DemoController } = require("../../controller");
const { validatorMiddleware } = require("../../middlewares");

const router = express.Router();

router.get(
  "/users",
  validatorMiddleware.validate,
  DemoController.getDemo
);

module.exports = router;
