const quizModel = require("../models/quiz_model");

exports.postDoublePlayerQuiz = async (req, res, next) => {
    try {
        const data = req.body;
        const category_id = data.category_id;
        const user1_id = data.user1_id;
        const user2_id = data.user2_id;
        const winner_user_id = data.winner_user_id;
        const user1_score = data.user1_score;
        const user2_score = data.user2_score;
        const user1_answers = JSON.stringify(data.user1_answers);
        const user2_answers = JSON.stringify(data.user2_answers);
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const played_on = datetime;
        const quiz_completed = data.quiz_completed;

        console.log(category_id, user1_id, user2_id, winner_user_id, user1_score, user2_score, user1_answers, user2_answers, played_on, quiz_completed);

        await quizModel.doublePlayerQuiz(category_id, user1_id, user2_id, winner_user_id, user1_score, user2_score, user1_answers, user2_answers, played_on, quiz_completed);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.getDoublePlayerQuiz = async (req, res, next) => {
    try {
        const getDoublePlayerQuiz = await quizModel.doublePlayerQuizget();
        res.status(200).json({ message: 'Data Found Successfully',getDoublePlayerQuiz });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.postDoublePlayerQuizLifelines = async (req, res, next) => {
    try {
        const data = req.body;
        const user_id = data.user_id;
        const quiz_id = data.quiz_id;
        const question_id = data.question_id;
        const life_no = data.life_no;
        
        console.log(user_id,quiz_id,question_id,life_no);

        await quizModel.doublePlayerQuizLifelines(user_id,quiz_id,question_id,life_no);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.getDoublePlayerQuizLifelines = async (req, res, next) => {
    try {
        const getDoublePlayerQuizLifelines = await quizModel.doublePlayerQuizLifelinesget();
        res.status(200).json({ message: 'Data Found Successfully',getDoublePlayerQuizLifelines });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.postSinglePlayerQuiz = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = req.userData;
        const category_id = data.category_id;
        const user_id = userData.id;
        const score = data.score;
        const answers = JSON.stringify(data.answers);
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const played_on = datetime;

        console.log('>>>>>>>>>>here im',category_id, user_id,score,answers, played_on);

        await quizModel.singlePlayerQuiz(category_id, user_id,score,answers, played_on);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.getSinglePlayerQuiz = async (req, res, next) => {
    try {
        const getSinglePlayerQuiz = await quizModel.singlePlayerQuizget();
        res.status(200).json({ message: 'Data Found Successfully',getSinglePlayerQuiz });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.postSinglePlayerQuizLifelines = async (req, res, next) => {
    try {
        const data = req.body;
        const quiz_id = data.quiz_id;
        const question_id = data.question_id;
        const life_no = data.life_no;

        await quizModel.singlePlayerQuizLifelines(quiz_id,question_id,life_no);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}

exports.getSinglePlayerQuizLifelines = async (req, res, next) => {
    try {
        const getSinglePlayerQuizLifelines = await quizModel.singlePlayerQuizLifelinesget();
        res.status(200).json({ message: 'Data Found Successfully',getSinglePlayerQuizLifelines });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}