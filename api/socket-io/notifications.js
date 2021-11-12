const _ = require("lodash");
const Notification = require("../model/notification");

const events = {};

const register = (socket) => {
   events.updateNotifications(socket);
   // events.updateAllNotifications(socket);
   events.markNotificationRead(socket);
   events.clearNotifications(socket);
   events.markTicketNotificationCommentsAsRead(socket);
};

const eventLoop = () => {
   events.updateNotifications();
};

events.updateNotifications = () => {
   var notifications = {};

   _.each(io.sockets.sockets, function (socket) {
      Notification.getForUserWithLimit(
         socket.request.userId,
         (err, notifications) => {
            if (err) {
               socket.emit("errors", "Notification userID is required");
               return socket.disconnect();
            }
            socket.emit("notifications", notifications);
         }
      );
   });
};

events.markTicketNotificationCommentsAsRead = (socket) => {
   const userId = socket.request.userId;

   socket.on("markTicketNotificationAsRead", async (ticketId) => {
      console.log(ticketId);
      await Notification.update(
         { data: { ticketId }, unread: true },
         { unread: false },
         { multi: true },
         function (err) {
            if (err) {
               socket.emit("error_", err);
            }
         }
      );
      events.updateNotifications();
   });
};

events.markNotificationRead = (socket) => {
   socket.on("markNotificationRead", function (_id) {
      Notification.markRead(_id, (err) => {
         if (!err) return;
      });
   });
};

events.clearNotifications = () => {};

module.exports = {
   register,
   eventLoop,
};
