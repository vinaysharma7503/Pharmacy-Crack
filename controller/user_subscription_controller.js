const {userSubscription} = require('../models/user_subscription_model');


exports.postUserSubscription = async (req,res,next)=>{
    try {
        const data = req.body;
        const userData = req.userData;
        const user_id = userData.id;
        const drug_store_id = data.drug_store_id;
        const subscription_details = JSON.stringify(data.subscription_details);
        const os_taken_on = data.os_taken_on;
        let datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const taken_on = datetime;

        await userSubscription(user_id,drug_store_id,subscription_details,os_taken_on,taken_on);
        res.status(200).json({ message: 'Thanks For Purchasing.' })
        
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        }
        res.status(500).send(err);
    }
}