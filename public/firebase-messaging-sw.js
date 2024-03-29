// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBtmYPdxLwiIAd6Z1sPB0fHjNtv2ZKiyqg",
  authDomain: "easvm-d4d52.firebaseapp.com",
  projectId: "easvm-d4d52",
  storageBucket: "easvm-d4d52.appspot.com",
  messagingSenderId: "1096446815099",
  appId: "1:1096446815099:web:5ea854a602a6a11b6cabde",
  measurementId: "G-4PREBBS2X5"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  // Customize notification here

  const notificationTitle = 'Background Message Title';

  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});