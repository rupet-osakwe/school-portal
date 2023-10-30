
const Student = require('../mySchemas/Student');

const getAllStudents = async (req, res) => {
    const result = await Student.find().exec();
    res.status(200).json(result);
    console.log(result);
    if (!result) return res.status(401).json('No student was found')

}

const regNewStudent = async (req, res) => {
    const { userName, email, firstName, lastName, dateOfBirth, studentClass } = req.body;

    if (!userName || !email || !firstName || !lastName || !dateOfBirth || !studentClass) {
        return res.status(400).json('Invalid application: username, email, first name, last name, and class are required');
    }

    const duplicate = await Student.findOne({ userName }).exec();
    if (duplicate) {
        return res.sendStatus(409).json('Oops! Username and email have already been chosen by another user');
    }

    try {
        const result = await Student.create({
            userName,
            email,
            firstName,
            lastName,
            dateOfBirth,
            studentClass
        });

        console.log(result);
        res.status(201).json({ Success: `You have successfully registered ${userName} Into The School Data base` });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(500).json();
    }
};
const updateStudent = async (req, res) => {
    const uniqueID = req.body.id
    if (!uniqueID) res.status(400).json({ 'Message': 'Student Unique ID Is Required' });

    try {
        const student = await Student.findById(req.body.id);
        if (!student) res.status(400).json({ 'Message': `The Unique ID ${req.body.id} Was Not Found Or Does Not Exist In This Data Base` });
        if (req.body?.userName) {
            student.userName = req.body.userName
        }
        if (req.body?.firstName) {
            student.firstName = req.body.firstName
        }
        if (req.body?.lastName) {
            student.lastName = req.body.lastName
        }
        if (req.body?.dateOfBirth) {
            student.dateOfBirth = req.body.dateOfBirth
        }
        if (req.body?.email) {
            student.email = req.body.email
        }
        if (req.body?.studentClass) {
            student.studentClass = req.body.studentClass
        }
        const result = await student.save();
        res.json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json('Internal Server Error');
        console.log(err.message)
    };
}
const deleteStudent = async (req, res) => {
    const uniqueID = req.params.id;
    const username = req.body.userName;
    if (!uniqueID) {
        return res.status(400).json({ message: 'ID Parameter is required' });
    }
    try {
        const student = await Student.findOne({ _id: uniqueID });
        if (!student) return res.status(204).json({ message: `No Student matches with ${uniqueID}` });

        const result = await student.deleteOne({ _id: uniqueID }).exec();
        res.status(201).json(`You deleted ${username} ${uniqueID}`);
    } catch (err) {
        console.log(err);
    }
};

const getOneStudent = async (req, res) => {
    const uniqueID = req.params.id;
    if (!uniqueID) {
        return res.status(400).json('Student Unique ID Is required');
    }
    try {
        const result = await Student.findOne({ _id: uniqueID }).exec();
        if (!result) {
            return res.status(404).json(`Unique ID ${uniqueID} Not Found`);
        }
        console.log(result);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json('Internal Service Error');
    }
};

module.exports = { getAllStudents, regNewStudent, updateStudent, deleteStudent, getOneStudent };
