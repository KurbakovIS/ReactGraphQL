const winston = require('winston');
const ENV = process.env.NODE_ENV;

let logger =new winston.createLogger({
        transports: [
            new winston.transports.Console({
                handleExceptions: true,
                json: false,
                colorize: true,
                level: (ENV === 'development') ? 'debug' : 'error',
            })
        ]
    });


module.exports = logger;
