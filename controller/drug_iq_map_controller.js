const IQMAP = require('../models/drug_iq_map_model');

exports.postIQ = async(req,res,next)=>{
    try {
        const data = req.body;
        const userData = req.userData;
        const user_id = userData.id;
        const level_no = data.level_no;
        const quiz_id = data.quiz_id;
        const category_id = data.category_id;

        const IQDATA = await IQMAP.postIQMAP(user_id,level_no,quiz_id,category_id);
        res.status(201).json({ message: 'User IQ Data Add Successfully', IQDATA });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}


exports.getIQ = async (req, res, next) => {
    try {
        const userData = req.userData;
        const user_id = userData.id;
        const userIqLevel = await IQMAP.getIQMAP(user_id);
        res.status(200).json({ message: 'Data Found Successfully',userIqLevel });
    } catch (err) {
        return res.status(400).send({ 'message': err.message });
    }
}