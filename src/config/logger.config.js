const { createLogger, transports, format } = require("winston");

const myLogger = createLogger({
    transports: [
        new transports.File({
            filename: "myLog.log",
            format: format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.json()
            ),
        }),
    ],
});

module.exports = myLogger;
