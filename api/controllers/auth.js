const jwt = require("jsonwebtoken");
var createError = require("http-errors");

const catchAsyncErrors = require("../utils/catch-async-errors");
const sendSMS = require("../utils/send-sms");
const User = require("../model/user");

const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};

const createSendToken = (user, res, statusCode) => {
   const token = signToken(user._id);

   const cookieOption = {
      expires: new Date(
         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
   };

   if (process.env.NODE_ENV === "production") cookieOption.secure = true;

   res.cookie("jwt", token, cookieOption);

   user.password = undefined;

   res.status(statusCode).json({
      status: "success",
      token,
      data: {
         user,
      },
   });
};

exports.login = catchAsyncErrors(async (req, res, next) => {
   const { username, password } = req.body;

   // 1) Check if email and password exist
   if (!username || !password) {
      return next(createError(400, "Please provide username and password"));
   }

   // 2) Check if user exists && password is correct
   const user = await User.findOne({
      $or: [{ phone: username }, { email: username }],
   }).select("+password");

   if (!user || !(await user.checkPassword(password))) {
      return next(createError(401, "Invalid login credentials"));
   }

   // Check if user is not blocked
   if (user.isBlocked) {
      return next(
         createError(401, "Your account has been blocked or deleted!")
      );
   }

   // 3) If everything ok, send token to client
   createSendToken(user, res, 200);
});

exports.logout = (req, res) => {
   res.cookie("jwt", undefined, {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   });
   res.status(200).json({ status: "success" });
};

exports.register = catchAsyncErrors(async (req, res, next) => {
   const { phone, password, identityNumber } = req.body;

   if (!identityNumber) {
      return next(createError(400, "Identity number is required"));
   }

   if (!phone) {
      return next(createError(400, "Phone number is required"));
   }

   // 1) Check if the user is employee or not
   const user = await User.findOne({ identityNumber });
   if (!user) {
      return next(createError(401, "sorry, you are not ibs employee"));
   }

   // 2) Check if user is registered before
   if (user.isRegistered) {
      return next(createError(409, "User already exists"));
   }

   if (phone !== user.phone) {
      const lastThreeNumber = user.phone.slice(
         user.phone.length - 3,
         user.phone.length
      );

      return next(
         createError(400, `Please use the phone ends with ${lastThreeNumber}`)
      );
   }

   user.isRegistered = true;
   user.password = password;
   user.registeredAt = new Date();

   await user.save({ validateBeforeSave: true });

   // 3) If everything ok, send token to client
   createSendToken(user, res, 200);
});

exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
   const phone = req.body.phone;
   const user = await User.findOne({ phone });

   if (!user) {
      return next(
         createError(404, "there is no account with that phone number")
      );
   }

   // Generate a random code
   user.generateCode();
   await user.save({ validateBeforeSave: false });

   // Send the random code to the user's phone
   const message = await sendSMS(
      phone,
      `Your verification code is ${user.code}`,
      "a"
   );

   if (message === "error") {
      return next(createError(500, "Something went wrong"));
   }

   res.status(200).json({
      status: "success",
      message: "A rest code has been sent to your mobile phone",
   });
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
   const { phone, code } = req.body;

   const user = await User.findOne({ phone: phone }).select(
      "+code +codeExpiresIn"
   );

   if (!user) {
      return next(
         createError(404, "There is no account with that phone number.")
      );
   }

   const currentDate = new Date().getTime();

   // Verify code
   if (code !== user.code || user.codeExpiresIn < currentDate) {
      return next(createError(400, "Invalid or expired activation code."));
   }

   res.status(200).json({});
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
   const { currentPassword, newPassword } = req.body;

   const user = req.user;

   // 1) Check if user exists && password is correct
   if (!user || !(await user.checkPassword(currentPassword))) {
      return next(createError(400, "The current password is incorrect"));
   }

   user.changePasswordAt = new Date();
   user.password = newPassword;

   await user.save({ validateBeforeSave: true });

   // 2) If everything ok, send token to client
   createSendToken(user, res, 200);
});
