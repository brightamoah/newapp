import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import timepicker from 'vue3-time-picker-plugin'
import 'vue3-time-picker-plugin/dist/style.css'
import paystack from 'vue3-paystack'

// import { getAnalytics } from "firebase/analytics";
//  import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
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
initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// //initialize firestore service
//  const db = getFirestore();

// // Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(App);

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(paystack)
app.use(timepicker)
app.use(createPinia())
app.use(router)
app.use(Toast, {
  transition: 'vue-Toastification__bounce',
  maxToast: 5,
  newstOnTop: true,
  timeout: 1500,
  position: 'top-center'
})
app.use(pinia)
//  app.use(getFirestore() )
// app.use(getAnalytics)

app.mount('#app')
