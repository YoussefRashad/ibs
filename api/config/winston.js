const appRoot = require("app-root-path");
const winston = require("winston");

const options = {
   file: {
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      //   maxsize: 5242880, // 5MB
      //   maxFiles: 5,
      colorize: false,
   },
};

const logger = winston.createLogger({
   transports: [new winston.transports.File(options.file)],
});

logger.stream = {
   write: function (message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
   },
};

module.exports = logger;
