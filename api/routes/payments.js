const express = require("express");
const router = express.Router();

const {
   getAllPayments,
   getPayment,
   createPayment,
   updatePayment,
} = require("../controllers/payments");

const permission = require("../middlewares/permission");

router
   .route("/")
   .get(permission("read", "payments"), getAllPayments)
   .post(permission("create", "payments"), createPayment);

router
   .route("/:id/")
   .get(getPayment)
   .patch(permission("update", "payments"), updatePayment);

module.exports = router;
