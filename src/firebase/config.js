import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDo-vrYKU1ksjMJm7JuDW7_gZklyVx7MyM",
    authDomain: "cphweb-vue-firebase.firebaseapp.com",
    projectId: "cphweb-vue-firebase",
    storageBucket: "cphweb-vue-firebase.appspot.com",
    messagingSenderId: "172023285135",
    appId: "1:172023285135:web:a4dd3fe6c3fe9e411937fa"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init auth
const projectAuth = firebase.auth()

// init firestore
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }