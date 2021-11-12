const express = require("express");
const router = express.Router();

const {
   getUser,
   uploadUserImage,
   resizeUserImage,
   getMe,
   getUserTickets,
   getUserPayments,
   updateMe,
} = require("../controllers/users");

// Current user endpoints
router
   .route("/me")
   .get(getMe, getUser)
   .patch(uploadUserImage, resizeUserImage, updateMe);

// GET current user tickets
router.get("/me/tickets", getMe, getUserTickets);

// GET current user payments
router.get("/me/payments", getMe, getUserPayments);

// GET current user single payment
router.get("/me/payments/:id", getMe);

// GET

module.exports = router;
