
const Staff = require('../mySchemas/Staffs');
const nodemailer = require('nodemailer');
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY

const getAllStaffs = async (req, res) => {
    try {
        const result = await Staff.find().exec();
        if (!result || result.length === 0) {
            return res.status(401).json('No staff was found');
        }
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
};

const regNewStaff = async (req, res) => {
    const { userName, email, firstName, lastName, password, gender, designation, maritalStatus } = req.body;

    if (!userName || !email || !firstName || !lastName || !gender || !password || !designation || !maritalStatus) {
        return res.status(400).json('Invalid application: username, email, first name, last name, password, gender, designation, and marital status are required');
    }

    try {
        const duplicate = await Staff.findOne({ email }).exec();
        if (duplicate) {
            return res.status(409).json('Oops! A user with these credentials have already been registered in the Data Base');
        }

        const result = await Staff.create({
            userName,
            email,
            firstName,
            lastName,
            password,
            gender,
            designation,
            maritalStatus,
            Active: true
        });

        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'rupetosakwe@gmail.com',
            name: 'Mr. Osakwe Rupet',
            designation: 'Admin'
        }
        const receiver = [
            {
                email: email,
            },
        ]
        tranEmailApi
            .sendTransacEmail({
                sender,
                to: receiver,
                subject: 'Successful registration into the staff DB',
                textContent: `you have been successfully registered into the school staff DB with the following credentials:\n Name: ${firstName} ${lastName} \n User Name:${userName} \n email: ${email} \n Password: ${password}\n Designation: ${designation}`,
                params: {
                    role: 'Staff',
                },
            })
            .then(console.log(result))

        // .catch(console.log)

        res.status(201).json({ Success: `You have successfully registered ${userName} into the staff's DB` });
    } catch (err) {
        console.log(err);
        res.status(500).json('Internal Server Error');
    }
};

const updateStaff = async (req, res) => {
   
    try {

         const { userName, email, firstName, lastName, password, gender, designation, maritalStatus } = req.body;
    const uniqueID = req.body.id;
    if (!uniqueID) return res.status(400).json({ 'Message': 'Staff Unique ID Is Required' });

        const staff = await Staff.findById(req.body.id);
        if (!staff) {
            return res.status(404).json({ 'Message': `The Unique ID ${uniqueID} Was Not Found Or Does Not Exist In This Database` });
        }

        if (req.body?.userName) {
            staff.userName = req.body.userName;
        }

        if (req.body?.password) {
            staff.password = req.body.password;
        }
        if (req.body?.firstName) {
            staff.firstName = req.body.firstName;
        }
        if (req.body?.lastName) {
            staff.lastName = req.body.lastName;
        }
        if (req.body?.email) {
            staff.email = req.body.email;
        }
        if (req.body?.designation) {
            staff.designation = req.body.designation;
        }
        if (req.body?.gender) {
            staff.gender = req.body.gender;
        }
        if (req.body?.maritalStatus) {
            staff.maritalStatus = req.body.maritalStatus;
        }
        if (req.body.Active !== undefined) {
            staff.Active = req.body.Active
        }
        const result = await staff.save();
        res.json(result);
        console.log(result);
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'rupetosakwe@gmail.com',
            name: 'Mr. Osakwe Rupet',
            designation: 'Admin'
        }
        const receiver = [
            {
                email: email
            },
        ]
        tranEmailApi
            .sendTransacEmail({
                sender,
                to: receiver,
                subject: 'Updated Staff Details',
                textContent: `Your personal credentials has been successfully updated on the staff data base as follows: \n ${result}`,
                params: {
                    role: 'Staff',
                },
            })
            .then(console.log(result))
        // .catch(console.log)  

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Internal Server Error');
    }
};

const deleteStaff = async (req, res) => {
    const uniqueID = req.body.id;
    if (!uniqueID) {
        return res.status(400).json({ message: 'ID Parameter is required' });
    }
    try {
        const staff = await Staff.findOne({ _id: uniqueID });
        if (!staff) return res.status(204).json({ message: `No Staff matches with ${uniqueID}` });

        const result = await staff.deleteOne({ _id: uniqueID });
        res.status(201).json({ 'Message': `You deleted the staff with the ID ${uniqueID}` });

    } catch (err) {
        console.log(err.message);
        res.status(500).json('Internal Server Error');
    }
};

const getOneStaff = async (req, res) => {
    const uniqueID = req.params.id;
    if (!uniqueID) {
        return res.status(400).json('The Staff Unique ID Is required');
    }
    try {
        const result = await Staff.findById(uniqueID).exec();
        if (!result) return res.status(400).json(`Unique ID ${uniqueID} Not Found`);
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).json('Internal Service Error');
    }
};

module.exports = { getAllStaffs, regNewStaff, updateStaff, deleteStaff, getOneStaff };
