const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const authRoutes = require("./api/routes/auth");
const infoRoutes = require("./api/routes/information");
const usersRoutes = require("./api/routes/users");
const ticketsRoutes = require("./api/routes/tickets");
const paymentsRoutes = require("./api/routes/payments");
const commonReplies = require("./api/routes/common-replies");
const rolesRoutes = require("./api/routes/roles");
const { errorController } = require("./api/controllers/errors");
const { isAuth } = require("./api/middlewares/auth");

const { createInitialDirectories } = require("./api/utils/utils-functions");
const winston = require("./api/config/winston");

// Start express app
const app = express();

// 1) GLOBAL MIDDLEWARES
// Access-Control-Allow-Origin *
app.use(cors());

// Serving static files
app.use(express.static(path.join(__dirname, "public")));
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "client/build")));
}

// Set security HTTP headers
app.use(helmet());

// Development logging
// if (process.env.NODE_ENV === "development") {
app.use(morgan("combined", { stream: winston.stream }));
// }

// Limit requests from same API (prevent brute force attack and dinal of service)
if (process.env.NODE_ENV === "production") {
   const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: "Too many requests from this IP, please try again in an hour!",
   });
   app.use("/api", limiter);
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS injection attack
app.use(xss());

// Prevent paramter pollution
app.use(
   hpp({
      whitelist: [],
   })
);

app.use(compression());

createInitialDirectories();

// 3) ROUTES
// app.use("/api/oracle", oracleRoutes);
app.use("/api/", authRoutes);

app.use("/api/", isAuth);

app.use("/api/info", infoRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/replies", commonReplies);
app.use("/api/roles", rolesRoutes);

// Handle API 404 not found error
app.all("/api/*", (req, res, next) => {
   next(createError(404, `${req.originalUrl} is not exist`));
});

// The "catchall" handler: for any request that doesn't match one above
if (process.env.NODE_ENV === "production") {
   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname + "/client/build/index.html"));
   });
}
// Handle global API error
app.use(errorController);

module.exports = app;

// insertDummyData ["info", "roles",]
// Create logs function
