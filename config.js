import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAqr8m-6gJ4ZwoMrkK7CttBsYeICb6GipU",
  authDomain: "e-library-a1619.firebaseapp.com",
  projectId: "e-library-a1619",
  storageBucket: "e-library-a1619.appspot.com",
  messagingSenderId: "695326829018",
  appId: "1:695326829018:web:37517915661f8125aab8e3"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();