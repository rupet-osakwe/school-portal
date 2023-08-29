const mongoose = require('mongoose');

const connectDB = async () => {
    const URI = process.env.DATABASE_URI;
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.log(err);
        throw new Error(err.message)
    }
}
module.exports = connectDB