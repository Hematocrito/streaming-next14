/* eslint-disable camelcase */
import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  // eslint-disable-next-line consistent-return
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: 'AIzaSyB7iYPjAFt6PkjjhuxXOHzUHOD5-ojrY58',
        authDomain: 'myadultfan-fa387.firebaseapp.com',
        projectId: 'myadultfan-fa387',
        storageBucket: 'myadultfan-fa387.appspot.com',
        messagingSenderId: '182964393687',
        appId: '1:182964393687:web:0e84f487153ca5e78d0292',
        measurementId: 'G-93QTN3T79Q'
      });

      try {
        const messaging = firebase.messaging();
        const tokenInLocalForage = await localforage.getItem('fcm_token');

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === 'granted') {
        // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey: 'your_web_push_certificate_key_pair'
          });

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem('BKKFJGe4NBptcju61Kn6V_5vHKDgZ4z0j7fbkeFs1_Hl1ZDFCp_ni82tG6AWHzE12LXx9kcb56Ym5zrCzj0GQ1E', fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }
};
export { firebaseCloudMessaging };
