const dashboardModel = require("../models/dashboard_model");

exports.postdashboard = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = req.userData;
        const user_id = userData.id;
        const life_no = data.life_no;
        const reward_no = data.reward_no;
        const points = data.points;
        const score = data.score;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const earned_on = datetime;
        const used_on = datetime;
        const earned_type = JSON.stringify(data.earned_type);
        const used_type = JSON.stringify(data.used_type);
        const level_achieved = data.level_achieved;
        const level_achieved_on = datetime;

        console.log(user_id,life_no, reward_no, points, score, earned_on, used_on, earned_type, used_type, level_achieved, level_achieved_on);

        const result = await dashboardModel.dashboard(user_id,life_no, reward_no, points, score, earned_on, used_on, earned_type, used_type, level_achieved, level_achieved_on);
        console.log(result);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }
}

exports.getdashboard = async (req, res, next) => {
    try {
        const getdashboard = await dashboardModel.dashboardget();
        res.status(200).json({ message: 'Data Found Successfully', getdashboard });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }
}