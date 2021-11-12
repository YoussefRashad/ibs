const express = require("express");
const router = express.Router();

const {
   getAllUsers,
   getUser,
   updateUser,
   createUser,
   uploadUserImage,
   resizeUserImage,
   getMe,
   getUserTickets,
   getUserPayments,
   updateMe,
   setUserNotificationToken,
   blockUser,
   changeUserRole,
} = require("../controllers/users");

const permission = require("../middlewares/permission");

router
   .route("/")
   .get(permission("read", "users"), getAllUsers)
   .post(permission("create", "users"), createUser);

router.post("/set-notification-token", getMe, setUserNotificationToken);

router.patch("/block-user/:id", permission("delete", "users"), blockUser);

router.patch(
   "/change-role/:id",
   permission("update", "changeUserRole"),
   changeUserRole
);

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
// router.get("/me/payments/:id", getMe);

// GET current user single ticket
// router.get("/me/payments/:id", getMe);

// GET user payments by ID
router
   .route("/:id/payments")
   .get(permission("read", "payments"), getUserPayments);

// GET user tickets by ID
router.route("/:id/tickets").get(permission("read", "tickets"), getUserTickets);

router
   .route("/:id")
   .get(permission("read", "users"), getUser)
   .patch(permission("update", "users"), updateUser);

module.exports = router;
