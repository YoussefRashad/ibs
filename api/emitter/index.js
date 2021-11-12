const { EventEmitter } = require("events");
const _ = require("lodash");

const {
   sendNotificationByToken,
   sendNotificationByUserId,
} = require("../firebase/firebase-notifications-handler");
const Notification = require("../model/notification");
const Ticket = require("../model/ticket");
const User = require("../model/user");
const emitter = new EventEmitter();

const saveNotification = (user, ticketId, title, message, type) => {
   const notification = new Notification({
      owner: user,
      title,
      message,
      type,
      data: { ticketId },
      unread: true,
   });

   return notification.save();
};

emitter.on("onCreateNewTicket", async (ticket) => {
   const { department } = ticket;
   const users = await User.find({ role: department }).select(
      "_id +notificationToken"
   );

   // Save notification
   _.each(users, (user) => {
      saveNotification(
         user._id,
         ticket,
         `New ticket ${ticket.uid} has been created`,
         ticket.description,
         "ticket"
      );
   });

   // Send notification
   _.each(users, (user) => {
      sendNotificationByToken(user.notificationToken, {
         title: `New ticket ${ticket.uid} has been created`,
         body: ticket.description,
         url: process.env.URL,
         id: ticket._id,
      });
   });
});

emitter.on("addTicketComment", async (ticketId, userId, comment) => {
   // var { subscribers, owner } = ticket;
   // Find the ticket by it's id
   var { subscribers, owner, uid } = await Ticket.findById(ticketId);

   if (!subscribers.includes(owner._id)) {
      subscribers.push(owner._id);
   }

   subscribers = subscribers.filter((subscriber) => {
      return subscriber != userId;
   });

   console.log(subscribers);

   //  Save notification
   _.each(subscribers, (subscriber) => {
      saveNotification(
         subscriber,
         ticketId,
         `#${uid} New ticket comment`,
         `${comment}`,
         "comment"
      );
   });

   // Send notification
   _.each(subscribers, (subscriber) => {
      sendNotificationByUserId(subscriber, {
         title: `#${uid} New ticket comment`,
         body: `${comment}`,
         url: process.env.URL,
         id: ticketId,
      });
   });
});

module.exports = emitter;
