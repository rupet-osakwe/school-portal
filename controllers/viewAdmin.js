const Admin = require('../mySchemas/Admin')

const createAdmin = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json(`Invalid application: username, email and password are required`);
    }

    const duplicate = await Admin.findOne({ email }).exec();
    if (duplicate) {
        return res.status(409).json('Oops! email have already been chosen by another user');
    }

    try {
        const result = await Admin.create({
            userName,
            email,
            password
        });

        console.log(result);
        res.status(201).json({ Success: `You have successfully registered ${userName} Into The Admin Data base` });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500).json();
    }
};
const getAdmin = async (req, res) => {
    const result = await Admin.find().exec();
    res.status(200).json(result);
    console.log(result);
    if (!result) return res.status(401).json('No Admin was found')

}

module.exports = { createAdmin, getAdmin } 