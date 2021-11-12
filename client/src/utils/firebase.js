import * as firebase from "firebase/app";
import "firebase/messaging";
import HTTP from "./axios";

// Initialize Firebase
const firebaseConfig = {
   apiKey: "AIzaSyACJ1EFy075OGGu_ayy8Tly5NOaEwCeBP0",
   authDomain: "ibs-270809.firebaseapp.com",
   databaseURL: "https://ibs-270809.firebaseio.com",
   projectId: "ibs-270809",
   storageBucket: "ibs-270809.appspot.com",
   messagingSenderId: "288061419627",
   appId: "1:288061419627:web:d950165cc45829487d012e",
   measurementId: "G-NHLT36RYD5",
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

messaging.usePublicVapidKey(
   "BKPCBI34IFXSsBdEdkhV2Ew9Eah3nHiJhNExWBdJJZm7xbMTxEZNeTt1S9jlrr7GJPHxBf369KR2JbLnGH0NGK8"
);

const firebaseMessaging = () => {
   messaging
      .requestPermission()
      .then(() => {
         return messaging.getToken();
      })
      .then((token) => {
         HTTP.post("/users/set-notification-token", { token });
      })
      .catch((err) => {
         console.log(err);
      });

   messaging.onMessage((payload) => {
      // alert("Hello");
      // console.log("Message received. ", payload);
   });
};

// function sendTokenToServer(currentToken) {
//    if (!isTokenSentToServer()) {
//       console.log("Sending token to server...");
//       // TODO(developer): Send the current token to your server.
//       setTokenSentToServer(true);
//    } else {
//       console.log(
//          "Token already sent to server so won't send it again " +
//             "unless it changes"
//       );
//    }
// }

// function isTokenSentToServer() {
//    return window.localStorage.getItem("sentToServer") === "1";
// }

// function setTokenSentToServer(sent) {
//    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
// }

// function deleteToken() {
//    // Delete Instance ID token.
//    // [START delete_token]
//    messaging
//       .getToken()
//       .then((currentToken) => {
//          messaging
//             .deleteToken(currentToken)
//             .then(() => {
//                console.log("Token deleted.");
//                // setTokenSentToServer(false);
//                // [START_EXCLUDE]
//                // Once token is deleted update UI.
//                // resetUI();
//                // [END_EXCLUDE]
//             })
//             .catch((err) => {
//                console.log("Unable to delete token. ", err);
//             });
//          // [END delete_token]
//       })
//       .catch((err) => {
//          console.log("Error retrieving Instance ID token. ", err);
//       });
// }

export default firebaseMessaging;
