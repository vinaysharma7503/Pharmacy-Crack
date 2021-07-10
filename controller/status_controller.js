const { getStatus } = require('../models/status_model');

exports.status = async (req, res, next) => {
    try {
        const data = req.query;
        const userData = req.userData;
        const user_id = userData.id;
        const category_id = data.category_id;

       const Status = await getStatus(user_id,category_id);
        res.status(200).json({ message: 'User Category Status Found Successfully.', Status});
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }

}
