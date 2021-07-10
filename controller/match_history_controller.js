const matchHistory = require('../models/match_history_model');

exports.matchHistory = async (req, res, next) => {
    try {
        const userData = req.userData;
        const winner_user_id = userData.id;

        const winmatch = await matchHistory.winMatches(winner_user_id);
        const lossmatch = await matchHistory.lossMatches(winner_user_id);

        // var History = {
        //     "Wins" : await matchHistory.winMatches(winner_user_id),
        //     "Loss" : await matchHistory.lossMatches(winner_user_id)
        // }
        
        res.status(200).json({ message: 'Data Found Successfully', win:winmatch[0],loss:lossmatch[0] });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}