const createError = require("http-errors");

const handleCastError = (err) => {
   const message = `invalid ${err.path}: ${err.value}`;
   return createError(400, message);
};

const handleDuplicateError = (err) => {
   const keyValue = JSON.stringify(err.keyValue);
   const message = `duplicate field value ${keyValue}`;
   return createError(400, message);
};

const handleValidationError = (err) => {
   const errors = Object.values(err.errors)
      .map((el) => el.message)
      .join(", ");

   const message = `invalid input data: ${errors}`;
   return createError(400, message);
};

const handleUploadErrorMimeType = (err) => {
   return createError(400, err.message);
};

const handleAccessControlError = (err) => {
   return createError(400, err.message);
};

const sendErrorPro = (error, res) => {
   if (error.status) {
      res.status(error.status).json({
         message: error.message,
      });
   } else {
      console.error("ERROR 💥", err);
      res.status(500).json({
         status: "error",
         message: "Something went wrong!",
      });
   }
};

const sendErrorDev = (err, req, res) => {
   // A) API
   console.error("ERROR 💥", err);
   if (req.originalUrl.startsWith("/api")) {
      const statusCode = err.status || 500;
      res.status(statusCode).json({
         status: err.status,
         error: err,
         message: err.message,
         stack: err.stack,
      });
   }
};

exports.errorController = (error, req, res, next) => {
   if (process.env.NODE_ENV === "development") {
      sendErrorDev(error, req, res);
   } else if (process.env.NODE_ENV === "production") {
      if (error.name === "CastError") error = handleCastError(error);
      if (error.code === 11000) error = handleDuplicateError(error);
      if (error.name === "ValidationError")
         error = handleValidationError(error);
      if (error.name === "uploadErrorMimeType")
         error = handleUploadErrorMimeType(error);
      if (error.name === "AccessControlError")
         error = handleAccessControlError(error);
      sendErrorPro(error, res);
   }
};
