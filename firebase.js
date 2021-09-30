import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDpYlFxgU36AWkTAWcTtxIt39modZJrFUw",
  authDomain: "whatsapp-1832c.firebaseapp.com",
  projectId: "whatsapp-1832c",
  storageBucket: "whatsapp-1832c.appspot.com",
  messagingSenderId: "141161373163",
  appId: "1:141161373163:web:026ac7f2dbdefa73314dae"
};


const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }