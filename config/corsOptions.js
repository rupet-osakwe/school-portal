const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        const origins = allowedOrigins();
        if (origins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed By CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,POST,DELETE',
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
