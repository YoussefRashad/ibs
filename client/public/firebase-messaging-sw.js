importScripts("https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js");
importScripts(
   "https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js"
);

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

messaging.setBackgroundMessageHandler((payload) => {
   // const { data } = payload;
   const { title, body, icon, url, id } = payload.data;
   return self.registration.showNotification(title, {
      body,
      icon,
      data: {
         url,
         id,
      },
   });
});

self.addEventListener("notificationclick", function (event) {
   const { url, id } = event.notification.data;
   event.notification.close();
   event.waitUntil(clients.openWindow("/ticket/" + id));
});
