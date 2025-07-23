const express = require("express");
const morgan = require("morgan");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, (req, res) => {
    console.log(`server running on port ${ServerConfig.PORT}`);
});
