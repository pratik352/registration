const express = require("express");
const v1Routes = require("./v1");

const router = express.Router();

// v1 API routes
router.use("/v1/employees", v1Routes.employees);
router.use("/v1/demo", v1Routes.demo);
router.use("/v1/aadhar", v1Routes.aadharRoutes);

module.exports = router;
