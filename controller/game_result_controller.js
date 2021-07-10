const matchResult = require("../models/game_result_model");

exports.matchResult = async (req, res, next) => {
    try {
        const data = req.body;
        const game_id = data.game_id;

        const result = await matchResult.gameResult(game_id);
        
        res.status(200).json({ message: 'Data Found Successfully', result });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}