const leadershipboard = require('../models/leadershipboard_quiz_model');

exports.getLeadershipBoard_quiz = async (req,res,next)=>{
    try {
        const data = req.query;
        const category_id = data.category_id;
        const weeklyquiz = await leadershipboard.leadershipboard_quiz(category_id);
        res.status(200).json({ message: 'Weekly quiz found successfully.',weeklyquiz});
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}

exports.getLeadershipBoard_month_quiz = async (req,res,next)=>{
    try {
        const data = req.query;
        const category_id = data.category_id;
        const monthlyquiz = await leadershipboard.leadershipboardmonth_quiz(category_id);
        res.status(200).json({ message: 'Monthly quiz found successfully.',monthlyquiz});
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}

exports.getLeaderBoardUser = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.query;
        const category_id = data.category_id;
        const user_id  = userData.id;
        const maxQuizUser = await leadershipboard.leaderBoard(user_id,category_id);
        res.status(200).json({ message: 'Maximum quiz played by user within one week:', maxQuizUser });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }

    }
}

exports.getLeaderBoardUserMonth = async (req, res, next) => {
    try {
        const userData = req.userData;
        const data = req.query;
        const category_id = data.category_id;
        const user_id  = userData.id;
        const maxQuizUser = await leadershipboard.leaderBoardMonth(user_id,category_id);
        res.status(200).json({ message: 'Maximum quiz played by user within one month:', maxQuizUser });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }

    }
}