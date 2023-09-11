
const student = require('../mySchemas/Student');

const jwt = require('jsonwebtoken');
const role = require('../config/roles').Student;
require('dotenv').config();

const studentAuth = async (req, res, error) => {
    console.log(error);
    const { userName, email } = req.body;
    if (!userName || !email) return res.status(400).json("UserName, and Email Are Required");

    try {
        const user = await student.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json("User not found");
        }
        const roles = Object.values(user.role);

        const AccessToken = jwt.sign(
            {
                "User": {
                    "userName": user.userName,
                    "email": user.email,
                    "role": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1day" }
        );
        console.log(roles)
        const refreshToken = jwt.sign(
            {
                "userName": user.userName,
                "email": user.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1day' }
        );

        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);


        res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
        res.status(200).json({ AccessToken: AccessToken });
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal server error
    }
}

module.exports = { studentAuth };
