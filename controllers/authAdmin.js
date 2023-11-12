
const staff = require('../mySchemas/Staffs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const role = require('../config/roles').Admin;
require('dotenv').config();

const adminActive = async (req, res, error) => {
    console.log(error);
    const { userName, email, password } = req.body;
    if (!userName || !password || !email) return res.status(400).json("User Name, Password, and Email Are Required");

    try {
        const admin = await staff.findOne({ email }).exec();
        if (!admin) {
            return res.status(401).json("Admin not found");
        }

        const roles = Object.values(admin.roles);

        const AccessToken = jwt.sign(
            {
                "User": {
                    "userName": admin.userName,
                    "email": admin.email,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1day" }
        );

        const refreshToken = jwt.sign(
            {
                "userName": admin.userName,
                "email": admin.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1day' }
        );

        admin.refreshToken = refreshToken;
        const result = await admin.save();
        console.log(result);

        res.cookie("jwt", refreshToken, { sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });//httpOnly: true,
        res.status(200).json({ AccessToken });
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
}

module.exports = { adminActive };
