import { defineStore } from 'pinia'
import { ref, reactive, computed, onMounted } from 'vue'
import router from '@/router'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification,
  EmailAuthProvider,
  updateEmail
} from 'firebase/auth'
import 'firebase/auth'
import { onSnapshot, doc, setDoc, collection } from 'firebase/firestore'
// import {  uploadBytes, getDownloadURL, } from 'firebase/storage'
import { db } from '@/firebase/init.js'
// import { storage } from '@/firebase/init.js'
// import { useDatabaseStore } from '@/stores/DatabaseStore.js'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import CryptoJS from 'crypto-js'
// import { firestore } from 'firebase-admin'

// import Vue from 'vue';
// import Toast from 'vue-toastification';
// import "vue-toastification/dist/index.css";

const toast = useToast()
let auth
const isLoggedIn = ref(false)
export const useAuthStore = defineStore('authStore', () => {
  // const activeUser = ref({})
  // let auth
  // const initialize = () => {
  //     onAuthStateChanged(auth, (user) => {
  //         console.log('AuthStateChanged')
  //         console.log(user)
  //         if (user) {
  //             const uid = user.uid
  //             activeUser.value = { email: user.email, uid: uid }
  //             // isLoggedIn.value = true
  //         } else {
  //             activeUser.value = {}
  //             // isLoggedIn.value = false
  //         }
  //     })
  // };

  const name = ref('')
  const email = ref('')
  const phone = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const passwordFieldType = ref('password') // Initial password type
  const confirmPasswordFieldType = ref('password') // Initial confirm password type
  const passwordInput = ref(false)
  const confirmPasswordInput = ref(false)
  const errorMessage = ref('')
  const usersDatabase = ref([])
  let docRef
  const size = 200 // Optional size parameter
  const gravatarUrl = getGravatarUrl(email, size)

  // const reserve = useDatabaseStore()

  const userData = reactive({
    name: name.value,
    number: phone.value,
    email: email.value,
    password: password.value
  })

  console.log('number:', userData.number)

  //  const token = JSON.parse(localStorage.getItem('firebase:session::Food Ordering App')).token

  // const token = firebase
  //   .auth()
  //   .currentUser.getIdToken(true)
  //   .then(function (token) {
  //     console.log(token)
  //   })

  //Read all the users in the database
  // onMounted(() => {
  //   onSnapshot(collection(db, 'users'), (querySnapshot) => {
  //     const data = []
  //     querySnapshot.forEach((doc) => {
  //       const currentUsers = {
  //         id: doc.id,
  //         name: doc.data().name,
  //         email: doc.data().email,
  //         phone: doc.data().phone
  //       }
  //       data.push(currentUsers)
  //     })
  //     usersDatabase.value = data
  //     console.log('database =', usersDatabase)
  //   })
  // })

  function getGravatarUrl(email, size = 80) {
    const trimmedEmail = email.value.trim().toLowerCase()
    const hash = CryptoJS.SHA256(trimmedEmail).toString(CryptoJS.enc.Hex)
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
  }

  console.log('Gravatar URL:', gravatarUrl)

  const handleSubmit = () => {
    console.log('Signup Successful:', name.value, email.value, phone.value, password.value)
  }

  const togglePasswordFieldType = () => {
    passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
  }

  const toggleConfirmPasswordFieldType = () => {
    confirmPasswordFieldType.value =
      confirmPasswordFieldType.value === 'password' ? 'text' : 'password'
  }

  function formatPhoneNumber(event) {
    const phoneNumber = event.target.value
    if (phoneNumber.startsWith('0')) {
      phone.value = '+233' + phoneNumber.slice(1)
    }
  }

  const passwordMatch = computed(() => {
    return password.value === confirmPassword.value
  })

  const passwordLengthValid = computed(() => {
    return password.value.length >= 8
  })

  const signUp = () => {
    console.log('Signup Successful:', name.value, email.value, phone.value, password.value)

    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user
        const userId = user.uid

        updateProfile(user, {
          displayName: name.value,
          email: email.value,
          phoneNumber: phone.value,
          photoURL: gravatarUrl
        })

        //Send The user a verification email
        sendEmailVerification(user)

        // Add a new document with a generated id.
        const docRef = setDoc(doc(db, 'users', userId), {
          name: name.value,
          email: email.value,
          phone: phone.value,
          id: userId
        })

        console.log('Document written with ID: ', docRef.id)
        console.log(auth.currentUser)
        router.push('/email-verification')
      })

      .catch((error) => {
        console.log(error.code)
        alert(error.message)
      })
  }

  // let user = auth.currentUser

  const login = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value, phone.value)
      .then((userCredential) => {
        const user = userCredential.user
        updateProfilePicture()
        console.log('Profile photo updated ')
        isLoggedIn.value = true
        console.log('Logged In Successfully:', userCredential, user)

        if (user.emailVerified) {
          toast.success('User Logged In Successfully')
          // Direct user to home page
          setTimeout(() => {
            router.push('/')
          }, 500) // 0.5-seconds delay
        } else {
          // Direct user to email verification page
          router.push('/email-verification')
        }
        //reset form values
        email.value = ''
        password.value = ''
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Invalid Email'
            toast.error('Invalid Email')
            break

          case 'auth/user-disabled':
            errorMessage.value = 'User Disabled'
            toast.error('User Disabled')
            break

          case 'auth/invalid-credential':
            errorMessage.value = 'Wrong Email Or Password'
            toast.error('Wrong Email Or Password')
            break

          case 'auth/user-not-found':
            errorMessage.value = 'No Account With That Email Was Found'
            toast.error('No Account With That Email Was Found')
            break

          case 'auth/wrong-password':
            errorMessage.value = 'Wrong Password'
            toast.error('Wrong Password')
            break

          case 'auth/missing-email':
            errorMessage.value = 'No Account With That Email Was Found'
            toast.error('No Account With That Email Was Found')
            break

          default:
            errorMessage.value = error.message
            toast.error(error.message)
            break
        }
      })

      //reset form values
      email.value = ''
      password.value = ''

  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        updateProfilePicture()
        console.log(result.user)
        router.push('/')
        toast.success('User Logged In Successfully')
      })
      .catch((error) => {
        console.log(error.code)
        alert(error.meesage)
        toast.error(error.message)
      })
  }

  let activeUser = ref({})
  let uid
  onMounted(() => {
    auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      console.log('AuthStateChanged')
      console.log(user)
      if (user) {
        updateProfilePicture()
        uid = user.uid
        activeUser.value = {
          email: user.email,
          uid: uid,
          displayName: user.displayName,
          profilePicture: user.photoURL,
          phoneNumber: phone.value
        }
        console.log('Active User = ', activeUser.value)
        localStorage.setItem('isLoggedIn', true)

        onSnapshot(collection(db, 'users'), (querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            const currentUsers = {
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              phone: doc.data().phone
            }
            data.push(currentUsers)
          })
          usersDatabase.value = data
          console.log('database =', usersDatabase)
        })
      } else {
        activeUser.value = {}
        usersDatabase.value = []
        localStorage.removeItem('isLoggedIn')
      }
    })
  })

  // Check if user is logged in on page load
  if (localStorage.getItem('isLoggedIn')) {
    isLoggedIn.value = true
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('isLoggedIn')
      sessionStorage.clear()
      isLoggedIn.value = false
      activeUser.value = {}
      email.value = ''
      password.value = ''
      console.log('Active User = ', activeUser.value)
      toast('User Logged Out Successfully')
      router.push('/login')
      console.log('User logged out')
    })
  }

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        alert('Please check your email for instructions on how to reset your password')
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  const updateUserProfile = (displayName, email, phoneNumber, photoURL) => {
    const user = auth.currentUser
    updateProfile(user, {
      displayName: displayName,
      email: email,
      phoneNumber: phoneNumber,
      profilePicture: photoURL
    })
      .then(() => {
        console.log('Profile updated successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function updateProfilePicture() {
    const user = auth.currentUser
    updateProfile(user, {
      photoURL: gravatarUrl
    })
      .then(() => {
        console.log('Profile picture updated successfully',gravatarUrl)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updateUserEmail = (email) => {
    const auth = getAuth()
    const user = auth.currentUser
    updateEmail(auth.currentUser, email.value)
      .then(() => {
        //Send The user a verification email
        sendEmailVerification(user)
        console.log('Email updated successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updatePhoneNumber = (phoneNumber) => {
    const user = auth.currentUser
    updateProfile(user, {
      phoneNumber: phoneNumber
    })
      .then(() => {
        console.log('Phone number updated successfully')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const updatePassword = (password) => {
    const user = auth.currentUser
    const credential = EmailAuthProvider.credential(user.email, password)
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updatePassword(password)
          .then(() => {
            console.log('Password updated successfully')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log('Login Status(isLoggedIn)', isLoggedIn)

  return {
    signUp,
    login,
    signInWithGoogle,
    toggleConfirmPasswordFieldType,
    togglePasswordFieldType,
    handleSubmit,
    handleSignOut,
    forgotPassword,
    formatPhoneNumber,
    updateUserProfile,
    updateProfilePicture,
    updateUserEmail,
    updatePhoneNumber,
    updatePassword,
    // updateUserProfile,
    userData,
    passwordMatch,
    passwordLengthValid,
    name,
    email,
    phone,
    password,
    confirmPassword,
    passwordFieldType,
    confirmPasswordFieldType,
    confirmPasswordInput,
    passwordInput,
    errorMessage,
    isLoggedIn,
    usersDatabase,
    activeUser,
    docRef,
    gravatarUrl
  }
})
