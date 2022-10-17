// Import the functions you need from the SDKs you need
import  firebase  from "@react-native-firebase/app";

import auth from '@react-native-firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZEGy4AEA6bnlbZrki0IaBGPPIi-jfxuE",
  authDomain: "nector-online-groceries.firebaseapp.com",
  projectId: "nector-online-groceries",
  databaseURL: "https://nector-online-groceries-default-rtdb.firebaseio.com",
  storageBucket: "nector-online-groceries.appspot.com",
  messagingSenderId: "195182337502",
  appId: "1:195182337502:web:0c60a98a162040eb4c514f",
  measurementId: "G-FE9M53WRMM"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { auth}
