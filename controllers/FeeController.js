const FeeModel = require("../models/FeeModel");

module.exports.getFee = async (req, res, next) => {
    try {
        const fee = await FeeModel.find();
        res.status(200).json({
        fee,
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
};
//store fee
module.exports.storeFee = async (req, res, next) => {
    try {
        const {student,year,month,submitted,date} = req.body;
        const fee = new FeeModel({
            student,
            year,
            month,
            submitted,
        });
        fee
        .save()
        .then((result) => {
            res.status(201).json({
            result,
            });
        })
        .catch((err) => {
            controllerError(err, res, "Error occurred");
        });
    } catch (error) {
        controllerError(error, res, "Error occurred");
    }
}