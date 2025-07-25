const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(cors())

app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT,'0.0.0.0', (req, res) => {
    console.log(`server running on port ${ServerConfig.PORT}`);
});
