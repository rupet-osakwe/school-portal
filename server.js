const dotenv = require('dotenv');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const credentials = require('./middleware/credentials');
const verifyJWT = require('./middleware/verifyJwt');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3000;

dotenv.config();
connectDB().then(() => {
    console.log('connected to the DataBase successfully!')
}).catch((err) => {
    console.log(err);
    throw new Error(err.message);
});
app.use(credentials);
app.options('*', cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/studentBase', require('./routes/students'));
app.use('/staffBase', require('./routes/staff'));
app.use('/resultBase', require('./routes/result'));
app.use('/AdminLogin', require('./routes/adminAuth'));
app.use('/staffLogin', require('./routes/staffLogIn'));
app.use('/studentLogIn', require('./routes/studentLogIn'))
// app.use(verifyJWT);
app.listen(PORT, () => console.log(`Server Running On PORT ${PORT}`))