const createError = require("http-errors");
const Ticket = require("../model/ticket");
const Comment = require("../model/ticket-comment");
const factory = require("./factory");
const { statusToString } = require("../utils/utils-functions");
const catchAsyncErrors = require("../utils/catch-async-errors");

exports.getAllTickets = factory.getAll(Ticket, null, {
   fields: "-history -notes -subscribers",
});

exports.getTicket = factory.getOne(Ticket, {
   path: "subscribers",
   select: "photo name",
});

exports.createTicket = factory.createOne(Ticket);

exports.getTicketComments = catchAsyncErrors(async (req, res, next) => {
   const ticketId = req.params.id;

   const comments = await Comment.find({ ticket: ticketId });

   res.status(200).json({
      status: "success",
      data: comments,
   });
});

exports.ticketSubscribe = catchAsyncErrors(async (req, res, next) => {
   const ticketId = req.params.id;
   const userId = req.user._id;
   const { subscribe } = req.body;

   const ticket = await Ticket.findById(ticketId).select("subscribers");

   if (subscribe) {
      if (ticket.subscribers.includes(userId)) {
      } else {
         ticket.subscribers.push(userId);
      }
   } else {
      ticket.subscribers = ticket.subscribers.filter((subscriber) => {
         return JSON.stringify(subscriber) !== JSON.stringify(userId);
      });
   }

   await ticket.save();

   res.status(200).json({
      status: "success",
   });
});
