// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);

var messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  var title = 'Hello world';
  var options = {
    body: payload.data.status,
  };

  return self.registration.showNotification(title, options);
});

// curl -X POST --header "Authorization: key=AAAAekj3h7k:APA91bEeoKAPuSzpQArfdqSQd8cmRmF6O-pGUEpXQMc9JSqcAjNLoq83SSJXDZaXf_azJM7GZH6AdBu8jIEP8pbH5Az4HyPt_BVijupbnmevVP4Ty7GPOkUwS4GkVJ420D0YuR5qfi9zhRjdyxu0Mqa4Qcq-PEKvDg" --Header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"to\":\"f1Tvzw9Yqys:APA91bGwK7ckW3AAZAhtAx4vW168SIY3B7Vi-X-ewWKnMHAacT5ay-DlM0OWemw4x7TPX0gK0I88h-YniJ5cvanAvCAGnUUfAJIKekXvxcsDIpleHORAgH0BdnRfLKdS5TBNMjH5KAXr\",\"notification\":{\"body\":\"Yellow\"},\"priority\":10}"