const ticketSocket = require("./tickets");
const notificationsSocket = require("./notifications");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");

const ioEvents = (io) => {
   io.sockets.on("connection", function (socket) {
      // Allow user to join rooms
      socket.on("join", (room) => {
         socket.join(room);
      });

      console.log("Client Connected");

      ticketSocket.register(socket);
      notificationsSocket.register(socket);

      socket.on("disconnect", () => console.log("Client disconnected"));
   });

   global.io = io;

   global.socketServer = {
      eventLoop: {
         _loop: 0,
         start: function () {
            global.socketServer.eventLoop._loop = setInterval(function () {
               // The main socket event loop.
               notificationsSocket.eventLoop();
            }, 5000);
         },
         stop: function () {
            clearInterval(global.socketServer.eventLoop._loop);
         },
      },
   };

   global.socketServer.eventLoop.start();
};

const init = (server) => {
   const io = require("socket.io")(server);

   // Socket middleware
   io.use(async (socket, next) => {
      try {
         const token = cookie.parse(socket.handshake.headers.cookie);

         if (!token.jwt) {
            return next(401, "authentication error");
         }

         const verify = await jwt.verify(
            token.jwt,
            process.env.JWT_SECRET,
            (err, jwt) => {
               if (err) {
                  return next(401, "authentication error");
               }
               return jwt;
            }
         );

         socket.request.userId = verify.id;
         next();
      } catch (err) {
         console.log(err);
      }
   });

   ioEvents(io);
};

module.exports = init;
