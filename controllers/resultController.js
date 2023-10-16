
const Result = require('../mySchemas/Result');

const getAllResults = async (req, res) => {
    try {

        const result = await Result.find().exec();
        res.status(200).json(result);
        console.log(result);
        if (!result) return res.status(401).json('No student was found in the Data Base')
    } catch (err) {
        console.log(err)
    }

}

const regNewResult = async (req, res) => {
    const { firstName, lastName, term, subject, score, grade, studentClass } = req.body;

    if (!firstName || !lastName || !term || !subject || !score || !grade || !studentClass) {
        return res.status(400).json('Invalid application: username, email, first name, last name, and class are required');
    }

    const duplicate = await Result.findOne({ firstName: req.body.firstName, lastName: req.body.lastName }).exec();
    if (duplicate) {
        return res.status(409).json({ "message": "result already uploaded in the dataBase" });
    }

    try {
        const result = await Result.create({
            firstName,
            lastName,
            term,
            subject,
            score,
            grade,
            studentClass
        });

        console.log(result);
        res.status(201).json({ "Success": "You have successfully registered", result });
    } catch (err) {
        console.log(err);
        res.sendStatus(500).json();
    }
};
const updateResult = async (req, res) => {
    const uniqueID = req.body.id
    if (!uniqueID) { res.status(400).json({ 'Message': 'Result Unique ID Is Required' }) };

    try {
        const updatedResult = await Result.findById(req.body.id);
        if (!updatedResult) { res.status(400).json({ 'Message': `The Unique ID ${req.body.id} Was Not Found Or Does Not Exist In This Data Base` }) };
        if (req.body?.firstName) {
            updatedResult.firstName = req.body.firstName
        }
        if (req.body?.lastName) {
            updatedResult.lastName = req.body.lastName
        }
        if (req.body?.term) {
            updatedResult.term = req.body.term
        }
        if (req.body?.subject) {
            updatedResult.subject = req.body.subject
        }
        if (req.body?.studentClass) {
            updatedResult.studentClass = req.body.studentClass
        }
        if (req.body?.score) {
            updatedResult.score = req.body.score
        }
        const result = await updatedResult.save();
        res.json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json('Internal Server Error');
        console.log(err)
    };
}
const deleteResult = async (req, res) => {
    const uniqueID = req.body.id;
    if (!uniqueID) {
        return res.status(400).json({ message: 'ID Parameter is required' });
    }

    const studentResult = await Result.findOne({ _id: uniqueID }).exec();
    if (!studentResult) return res.status(204).json({ "message": "No Result matches with the result ID you provided" });
    try {
        const result = await studentResult.deleteOne({ _id: req.body.id });
        res.status(200).json({ "Message": `you deleted the result with the unique ID ${uniqueID} successfully` });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

const getOneResult = async (req, res) => {
    const uniqueID = req.params.id;
    if (!req?.params?.id) {
        return res.status(204).json('Student Unique ID Is required');
    }
    try {
        const result = await Result.findOne({ _id: req.params.id }).exec();
        if (!result) return res.status(204).json(`unique ID ${uniqueID} Not Found`)
        res.status(200).json(result)
        console.log(result);
    } catch (err) {
        res.status(500).json('Internal Service Error');
        console.log(err)
    }
}
module.exports = { getAllResults, regNewResult, updateResult, deleteResult, getOneResult };
