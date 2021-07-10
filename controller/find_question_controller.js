const { findQuestion } = require('../models/find_question_model');

exports.findquestion = async (req, res, next) => {
    try {
        const data = req.body;
        const question_id = data.question_id;
        console.log('user_id', user_id);
        const [findQues] = await findQuestion(question_id)
        res.status(200).json({ message: 'Question Found Successfully', ...findQues });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);

    }
}