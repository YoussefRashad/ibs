const createError = require("http-errors");
const multer = require("multer");
const sharp = require("sharp");

const Payment = require("../model/payment");
const Ticket = require("../model/ticket");
const User = require("../model/user");
const APIFeatures = require("../utils/API-features");
const catchAsyncErrors = require("../utils/catch-async-errors");
const factory = require("./factory");
const { filterObj } = require("../utils/utils-functions");

const multerStorage = multer.memoryStorage({});

const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith("image")) {
      cb(null, true);
   } else {
      cb(createError(400, "Not an image! Please upload only images."));
   }
};

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single("photo");

exports.resizeUserImage = catchAsyncErrors(async (req, res, next) => {
   if (!req.file) return next();

   req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

   await sharp(req.file.buffer)
      .resize(150, 150)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
   next();
});

exports.getAllUsers = factory.getAll(User, null, {
   fields: "name, ibsNumber, photo, job, phone, createdAt, role, gender",
});

exports.createUser = factory.createOne(User);

exports.getUser = factory.getOne(User);

// exports.deleteUser = factory.deleteOne(User);

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
   const { password, isBlocked, role } = req.body;
   // Check if user POSTs password data
   if (password) {
      return next(
         createError(
            400,
            "This route is not for password updates. Please use /update-password"
         )
      );
   }
   if (isBlocked !== undefined) {
      return next(
         createError(
            400,
            "This route is not for block user. Please use /block-user"
         )
      );
   }
   if (role !== undefined) {
      return next(
         createError(
            400,
            "This route is not for change user role. Please use /role"
         )
      );
   }

   const filteredBody = filterObj(
      req.body,
      "unwanted",
      "isVerified",
      "isRegistered"
   );

   const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
         new: true,
         runValidators: true,
      }
   );

   res.status(200).json({
      status: "success",
      data: updatedUser,
   });
});

exports.getMe = (req, res, next) => {
   req.params.id = req.user.id;
   next();
};

exports.updateMe = catchAsyncErrors(async (req, res, next) => {
   // Check if user POSTs password data
   if (req.body.password) {
      return next(
         createError(
            400,
            "This route is not for password updates. Please use /update-password"
         )
      );
   }

   // Filtered out wanted fields names that are allowed to be updated
   const filteredBody = filterObj(
      req.body,
      "wanted",
      "name",
      "phone",
      "email",
      "address"
   );
   if (req.file) filteredBody.photo = req.file.filename;

   // Update user document
   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
   });

   res.status(200).json({
      status: "success",
      data: updatedUser,
   });
});

exports.getUserTickets = catchAsyncErrors(async (req, res, next) => {
   const userId = req.params.id;
   const features = new APIFeatures(Ticket, { owner: userId, ...req.query })
      .filter()
      .fields()
      .sort()
      .page();

   const count = await features.count;
   const doc = await features.query;

   res.status(200).json({
      status: "success",
      results: count,
      limit: doc.length,
      data: doc,
   });
});

exports.getUserPayments = catchAsyncErrors(async (req, res, next) => {
   const userId = req.params.id;
   const features = new APIFeatures(Payment, { owner: userId, ...req.query })
      .filter()
      .fields()
      .sort()
      .page();

   const count = await features.count;
   const doc = await features.query;

   res.status(200).json({
      status: "success",
      results: count,
      limit: doc.length,
      data: doc,
   });
});

exports.setUserNotificationToken = catchAsyncErrors(async (req, res, next) => {
   const { token } = req.body;
   const userId = req.params.id;

   await User.findByIdAndUpdate(userId, { notificationToken: token });

   res.status(200).json({
      status: "success",
   });
});

exports.blockUser = catchAsyncErrors(async (req, res, next) => {
   const userId = req.params.id;
   const { isBlocked } = req.body;

   await User.findByIdAndUpdate(userId, { isBlocked });

   const message = isBlocked
      ? "User has been blocked successfully"
      : "User has been unblocked successfully";

   res.status(200).json({
      status: "success",
      message,
   });
});

exports.changeUserRole = catchAsyncErrors(async (req, res, next) => {
   const userId = req.params.id;
   const { role } = req.body;

   await User.findByIdAndUpdate(userId, { role });

   res.status(200).json({
      status: "success",
      message: "User role has been changed successfully",
   });
});
