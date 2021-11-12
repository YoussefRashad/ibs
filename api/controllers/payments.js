const Payment = require("../model/payment");
const factory = require("./factory");

exports.getAllPayments = factory.getAll(Payment, null, {
   fields: "-paymentsDetails",
});

exports.getPayment = factory.getOne(Payment);

exports.updatePayment = factory.updateOne(Payment);

exports.createPayment = factory.createOne(Payment);
