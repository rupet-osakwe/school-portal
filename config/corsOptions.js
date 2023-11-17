const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
            return
        } else {
            callback(new Error('Not Allowed By CORS'));
        }
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
        return origin
    },

    // methods: 'GET,PUT,POST,DELETE',
    methods: `*`,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
