const { userScoreGet } = require('../models/user_score_model');


exports.getscore = async (req, res, next) => {
    try {
        const userData = req.userData;
        const user_id = userData.id;
        console.log('user_id', user_id);
        const [score] = await userScoreGet(user_id)  // [score:{score:234}]
        res.status(200).json({ message: 'Score Found Successfully', ...score });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);

    }
}
