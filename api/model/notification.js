const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
   createdAt: { type: Date, default: new Date() },
   owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   message: { type: String, required: true },
   type: {
      type: String,
      required: true,
      enum: ["ticket", "message", "comment"],
   },
   data: Object,
   unread: {
      type: Boolean,
      default: true,
   },
});

notificationSchema.statics.getForUserWithLimit = function (userId, callback) {
   if (!userId)
      return callback(
         "Invalid ObjectId - NotificationSchema.GetForUserWithLimit()",
         null
      );

   return this.model("notification")
      .find({ owner: userId, unread: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .exec(callback);
};

notificationSchema.statics.markRead = function (_id, callback) {
   if (!_id) return true;

   this.model("notification")
      .findByIdAndUpdate(_id, { unread: false })
      .exec(callback);
};

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
