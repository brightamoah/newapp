// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// import { initializeApp } from 'firebase-admin/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA_oV-K7GiDOkuTNpBpVRH7653AaDMqPWk',
  authDomain: 'food-odering-app-21.firebaseapp.com',
  projectId: 'food-odering-app-21',
  storageBucket: 'food-odering-app-21.appspot.com',
  messagingSenderId: '628331085058',
  appId: '1:628331085058:web:5410b0cc6506240015d61b',
  measurementId: 'G-3E5EHFMT6M'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const analytics = getAnalytics(app)

//initialize firestore service
const db = getFirestore()

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

const storage = getStorage()

export { analytics, db, auth, storage }
