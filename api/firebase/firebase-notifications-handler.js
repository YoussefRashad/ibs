const { firebaseAdmin } = require("../config/firebase");
const User = require("../model/user");

const sendNotification = async (token, notification) => {
   const { title, body, icon, url, id } = notification;
   token
      ? await firebaseAdmin
           .messaging()
           .sendToDevice(token, {
              data: { title, body, url, id },
           })
           .then((response) => console.error(JSON.stringify(response)))
           .catch((error) => console.error(JSON.stringify(error)))
      : console.log("No Users to send notification to");
};

const sendNotificationByUserId = async (userId, notificationData) => {
   const user = await User.findOne({
      _id: userId,
      notificationToken: { $exists: true },
   }).select("+notificationToken");

   user
      ? sendNotification(user.notificationToken, notificationData)
      : console.log("No Users to send notification to");
};

const sendNotificationByToken = async (token, notificationData) => {
   sendNotification(token, notificationData);
};

module.exports = {
   sendNotificationByToken,
   sendNotificationByUserId,
};
