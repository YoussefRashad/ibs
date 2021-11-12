// const firebase = require("firebase/app");
const firebaseAdmin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

firebaseAdmin.initializeApp({
   credential: firebaseAdmin.credential.cert(serviceAccount),
   databaseURL: "https://ibs-270809.firebaseio.com",
});

module.exports = {
   firebaseAdmin,
};
