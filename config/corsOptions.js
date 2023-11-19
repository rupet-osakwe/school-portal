// const allowedOrigins = require('./allowedOrigins');

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//             return
//         } else {
//             callback(new Error('Not Allowed By CORS'));
//         }

//         // req.header('Access-Control-Allow-Origin', '*');
//         // req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//         // req.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         // req.header('Access-Control-Request-Headers', 'Content-Type, Authorization');
//         req.header('Access-Control-Allow-Credentials': true)

//         next();
//     },
//     Access-Control-request-Method:"POST",
//     methods: 'GET,PUT,POST,DELETE',
//     credentials: true,
//     // methods: `*`,
//     optionsSuccessStatus: 200
// };

// module.exports = corsOptions;

const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
            return;
        } else {
            callback(new Error('Not Allowed By CORS'));
        }
    },
    methods: 'GET,PUT,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;
