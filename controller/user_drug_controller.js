const drugModel = require('../models/user_drug_model');

exports.postdrug = async (req, res, next) => {
    try {
        const data = req.body;
        const drug_id = data.drug_id;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const taken_on = datetime;
        const payment_response = JSON.stringify(data.payment_response);
        const payment_platform_taken = data.payment_platform_taken;
        const spent_pills = data.spent_pills;

        console.log(drug_id, taken_on, payment_response, payment_platform_taken, spent_pills);

        await drugModel.drugStore(drug_id, taken_on, payment_response, payment_platform_taken, spent_pills);
        res.status(200).json({ message: 'Data Add Successfully' });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }
}

exports.getdrug = async (req, res, next) => {
    try {
        const getdrug = await drugModel.drugStoreget();
        res.status(200).json({ message: 'Data Found Successfully',getdrug });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }
}