const express = require("express");
const employeeRoutes = require("./employee.routes");

const router = express.Router();

// Employee routes
router.use("/employees", employeeRoutes);

module.exports = router;