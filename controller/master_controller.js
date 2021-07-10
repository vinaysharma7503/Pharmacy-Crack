const masterModel = require('../models/master_model');

//Master Bonus Controller


exports.getbonus = async (req, res, next) => {
    try {
        const getbonus = await masterModel.masterBonusGet()
        res.status(200).json({ message: 'Data Found Successfully', getbonus });

    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}


//Master category Controller


exports.getcategory = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const category = await masterModel.masterCategoryGet(id);
        res.status(200).json({ message: 'Data Found Successfully', category });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }
}



//Master Classification Controller

exports.getclassification = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const getclassification = await masterModel.masterClassificationGet(id);
        console.log("tttt");
        res.status(200).json({ message: 'Data Found Successfully', getclassification });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}

//Master Drug Controller


exports.getdrug = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const getdrug = await masterModel.masterDrugStoreGet(id);
        res.status(200).json({ message: 'Data Found Successfully', getdrug });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}



//Master Points Controller

exports.getpoints = async (req, res, next) => {
    try {
        const getpoints = await masterModel.masterPointsGet()
        res.status(200).json({ message: 'Data Found Successfully', getpoints });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}

//Master Rewards Controller

exports.getrewards = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const getrewards = await masterModel.masterRewardsGet(id)
        res.status(200).json({ message: 'Data Found Successfully', getrewards });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}

//Master Speciality Controller

exports.getspeciality = async (req, res, next) => {
    try {
        const data = req.body;
        const id = data.id;
        const getspeciality = await masterModel.masterSpecialityGet(id)
        res.status(200).json({ message: 'Data Found Successfully', getspeciality });
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}
