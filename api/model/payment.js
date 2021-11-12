const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
   owner: {
      type: mongoose.ObjectId,
      ref: "users",
      required: [true, "user id is required"],
   },
   createdAt: {
      type: Date,
      required: [true, "Payment slip date is required"],
      // default: new Date(),
   },
   bank: {
      name: {
         ar: {
            type: String,
            required: true,
         },
         en: {
            type: String,
            required: true,
         },
      },
      account: { type: String, required: true },
      text: {
         ar: String,
         en: String,
      },
   },
   total: { type: String, required: true },
   month: { ar: String, en: String },
   currency: {
      ar: {
         type: String,
         default: "ج.م.",
      },
      en: {
         type: String,
         default: "LE",
      },
   },
   paymentDetails: [
      {
         _id: false,
         key: { type: String, lowercase: true },
         title: {
            ar: String,
            en: String,
         },
         total: { type: String, default: null },
         values: [
            {
               _id: false,
               name: {
                  ar: String,
                  en: String,
               },
               value: {
                  ar: String,
                  en: String,
               },
            },
         ],
      },
   ],
});

const PaymentModel = mongoose.model("payments", paymentSchema);

module.exports = PaymentModel;
