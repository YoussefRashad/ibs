const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const User = require("../model/user");
const catchAsyncErrors = require("../utils/catch-async-errors");

exports.isAuth = catchAsyncErrors(async (req, res, next) => {
   // 1) Getting token and check of it's there
   var token = req.cookies.jwt;

   if (!token) {
      return next(
         createError(401, "You are not logged in! Please log in to get access.")
      );
   }

   // 2) Verification token
   const verify = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, token) => {
         if (err) {
            return next(
               createError(401, "invalid request token! Please log in again.")
            );
         }
         return token;
      }
   );

   // 3) Check if user still exists
   const user = await User.findById(verify.id).select(
      "+changePasswordAt +password"
   );

   if (!user) {
      return next(
         createError(
            401,
            "The user belonging to this token does no longer exist."
         )
      );
   }

   if (user.isBlocked) {
      return next(
         createError(401, "Your account has been blocked or deleted!")
      );
   }

   // 4) Check if user changed password after the token was issued
   if (user.changePasswordAt) {
      const getTime = Math.floor(user.changePasswordAt.getTime() / 1000);
      if (verify.iat < getTime) {
         return next(
            createError(401, "you have an expired token, please login again")
         );
      }
   }

   // GRANT ACCESS TO PROTECTED ROUTE
   req.user = user;
   return next();
});

exports.restrictTo = (...roles) => (req, res, next) => {
   const currentUserRole = req.user.role;
   if (roles.includes(currentUserRole)) {
      return next();
   }
   return next(
      createError(403, "You do not have permission to perform this action")
   );
};
