import firebase from "firebase";
const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyCRbC6pSQg3NuNrGoZj88QEPC7-C4n-zeM",
  authDomain: "instagram-react-be57a.firebaseapp.com",
  projectId: "instagram-react-be57a",
  storageBucket: "instagram-react-be57a.appspot.com",
  messagingSenderId: "328868155443",
  appId: "1:328868155443:web:ef75c9322c6e8364a99346",
  measurementId: "G-9ESKLMX8EG"
    }
  );
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  export {db,auth,storage};
  export  {firebaseApp};