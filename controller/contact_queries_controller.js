const env = require('../environment/env');
const contactModel = require('../models/contact_queries_model');

//Contact Queries Controller

exports.getcontact = async (req, res, next) => {
    try {
        const contact = await contactModel.getcontact()
        res.status(200).json({ message: 'Data Found Successfully',contact })
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}

exports.postcontact = async (req, res, next) => {
    try {
        const data = req.body;
        const userData = req.userData;  
        const user_id = userData.id;
        const query = data.query;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const submitted_on = datetime;;

        await contactModel.postcontact(user_id, query, submitted_on)
        res.status(200).json({ message: 'Thanks for contacting us.' })
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }

}

