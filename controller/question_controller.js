const questionModel = require('../models/questions_model');
const { findQuestion } = require('../models/find_question_model');

//Question Controller

exports.getquestion = async (req, res, next) => {
    try {
        const data = req.query;
        const category_id = data.category_id;
        const level_no = data.level_no;
        const getquestion = await questionModel.getquestion(level_no,category_id)
        res.status(200).json({ message: 'Data Found Successfully', getquestion });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);

    }
}

exports.postquestion = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = req.userData;
        const level_no = data.level_no;
        const question = data.question;
        const category_id = data.category_id;


        function shuffle(array) {
            var currentIndex = array.length, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        // Used like so
        var arr = [data.option_1,data.option_2, data.option_3, data.option_4];
        shuffle(arr);
        console.log(arr);
        let option_1 = arr[0];
        let option_2 = arr[1];
        let option_3 = arr[2];
        let option_4 = arr[3];
        let correct_option = arr.indexOf(data.option_1);
        const correct_points = data.correct_points;
        const uploaded_by = "U";
        const user_id = userData.id;
        const is_active = 1;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const submitted_on = datetime;;
        const options = [option_1, option_2, option_3, option_4]

       const {msg} =  await questionModel.postquestion(level_no, question, category_id, ...options, correct_option, correct_points, uploaded_by, user_id,is_active,submitted_on,2)

        res.status(200).json({ message:msg}) 
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);

    }
}

//Report Question Controller

exports.postReportQuestion = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = req.userData
        const user_id = userData.id;
        const category_id = data.category_id;
        const question_id = data.question_id;
        const reason = data.reason;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const done_on = datetime;

        await questionModel.postReportQuestion(user_id, category_id, question_id, reason, done_on)
        res.status(200).json({ message: 'Your question is reported successfully.' });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}



exports.findquestion = async (req, res, next) => {
    try {
        // const data = req.query;
        // const question_id = data.question_id;
        const findQues = await findQuestion()
        res.status(200).json({ message: 'Question Found Successfully', findQues });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);

    }
}