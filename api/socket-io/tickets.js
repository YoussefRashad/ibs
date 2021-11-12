const emitter = require("../emitter");
const Ticket = require("../model/ticket");
const Comment = require("../model/ticket-comment");

const events = {};

const register = (socket) => {
   events.onUpdateTicketStatus(socket);
   events.onNewTicket(socket);
   events.onAddComment(socket);
};

events.onUpdateTicketStatus = (socket) => {
   socket.on("updateTicketStatus", (t) => {
      const { ticketId } = t;
      const { status } = t;

      // Change Ticket Status
      Ticket.changeTicketStatus(ticketId, status, (err, res) => {
         if (err) {
            // Emit the error event
            return socket.emit("error_", err);
         }
         io.to(ticketId).emit("updateTicketStatus", res);
         io.sockets.emit("updateTicketOfTickets", res);
      });
   });
};

events.onNewTicket = (socket) => {
   const userId = socket.request.userId;

   socket.on("newTicket", async (ticket) => {
      // emitter.emit("onCreateNewTicket", ticket, userId);
      try {
         const res = await Ticket.create({ owner: userId, ...ticket });
         io.emit("newTicket", res);
      } catch (err) {
         socket.emit("error_", err);
      }
   });
};

events.onAddComment = (socket) => {
   const userId = socket.request.userId;
   socket.on("addTicketComment", async (t) => {
      const { ticketId } = t;
      const { comment } = t;

      try {
         const res = await Comment.create({
            ticket: ticketId,
            owner: userId,
            comment,
         });

         io.to(ticketId).emit("addTicketComment", res);
      } catch (err) {
         socket.emit("error_", err);
      }
      emitter.emit("addTicketComment", ticketId, userId, comment);
   });
};

module.exports = {
   register,
};
