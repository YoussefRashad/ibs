const express = require("express");
const router = express.Router();

const {
   getAllTickets,
   getTicket,
   createTicket,
   getTicketComments,
   ticketSubscribe,
} = require("../controllers/tickets");

const permission = require("../middlewares/permission");

router
   .route("/")
   .get(permission("read", "tickets"), getAllTickets)
   .post((req, res, next) => {
      req.body.owner = req.user._id;
      return next();
   }, createTicket);

router.route("/:id/subscribe").patch(ticketSubscribe);

router.route("/:id/comments").get(getTicketComments);

router.route("/:id").get(getTicket);

module.exports = router;
