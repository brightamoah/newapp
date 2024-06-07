<template>
  <NavbarComponent />
  <div class="login-container">
    <div>
      <img class="logo" src="/images/Logo_no BG red.jpg" />
      <p class="welcome-txt" id="wel-txt">Welcome back</p>
      <p class="welcome-txt">Please login below</p>
    </div>

    <div v-if="authStore.errorMessage" class="error-message">{{ authStore.errorMessage }}</div>

    <form class="input-field" @submit.prevent="authStore.handleSubmit">
      <input
        class="input"
        ref="emailRef"
        type="email"
        id="emailbox"
        v-model="authStore.email"
        placeholder="Email"
        required
      />

      <div class="password-container">
        <input
          class="input"
          id="passwordbox"
          :type="authStore.passwordFieldType"
          v-model="authStore.password"
          placeholder="Password"
          required
        />

        <button @click="authStore.togglePasswordFieldType" type="button" class="show-password-btn">
          <span v-if="authStore.passwordFieldType === 'password'"
            ><img class="show-icon" src="/icons/view.png"
          /></span>
          <span v-else><img class="show-icon" src="/icons/invisible.png" /></span>
        </button>
      </div>

      <div class="subsec">
        <div class="checkbox-sec">
          <label class="checkbox-txt" for="checkbox"
            >Remember me
            <input class="checkbox" id="checkbox" type="checkbox" />
            <span class="checkbox-container"></span>
          </label>
        </div>
        <div>
          <span class="link" @click="authStore.forgotPassword">Forgot password?</span>
        </div>
      </div>

      <div>
        <button class="submit-btn" type="submit" @click="authStore.login">Login</button>

        <div class="or">OR</div>

        <button class="signin-google" @click="authStore.signInWithGoogle">
          <img class="google-img" src="/icons/google.png" /><span class="google-txt"
            >Sign In With Google</span
          >
        </button>

        <p class="question">
          Don't have an account?
          <RouterLink to="/signup"><span class="link">Sign Up</span></RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginView'
}
</script>
<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup
// } from 'firebase/auth'
// import { ref } from 'vue'
// import router from '@/router'

// const email = ref('')
// const password = ref('')
// const phoneNumber = ref('')
// const errorMessage = ref('')

// const passwordFieldType = ref('password') // Initial password type

// const togglePasswordFieldType = () => {
//   passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
// }

// const handleSubmit = () => {
//   const userData = {
//     number: phoneNumber.value,
//     email: email.value,
//     password: password.value
//   }
//   console.log('Login Successful:', userData)
// }

// const login = () => {
//   const auth = getAuth()
//   signInWithEmailAndPassword(auth, email.value, password.value, phoneNumber.value)
//     .then((userData) => {
//       console.log('Logged In Successfully:', userData)
//       console.log(auth.currentUser)
//       router.push('/')
//     })
//     .catch((error) => {
//       console.log(error.code)
//       switch (error.code) {
//         case 'auth/invalid-email':
//           errorMessage.value = 'Invalid Email'
//           break
//         case 'auth/user-disabled':
//           errorMessage.value = 'User Disabled'
//           break
//         case 'auth/invalid-credential':
//           errorMessage.value = 'Wrong Email Or Password'
//           break
//         case 'auth/user-not-found':
//           errorMessage.value = 'No Account With That Email Was Found'
//           break
//         case 'auth/wrong-password':
//           errorMessage.value = 'Wrong Password'
//           break
//         default:
//           errorMessage.value = error.message
//           break
//       }
//     })
// }

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider()
//   signInWithPopup(getAuth(), provider)
//     .then((result) => {
//       console.log(result.user)
//       router.push('/')
//     })
//     .catch((error) => {
//       console.log(error.code)
//       alert(error.message)
//     })
// }
</script>

<style scoped>
.login-container {
  width: 30rem;
  height: auto;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.logo {
  width: 10rem;
  height: auto;
  margin-left: 30%;
  margin-top: 8px;
  margin-bottom: 1rem;
}
.welcome-txt {
  font-size: 1.2rem;
  margin-left: 20%;
}
#wel-txt {
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  font-weight: 500;
}

.input-field {
  width: 80%;
  height: auto;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 30px;
}
.input {
  width: 100%;
  height: 4rem;
  padding: 10px;
  border: 1px solid black;
  border-radius: 15px;
}

.password-container {
  position: relative;
}

.show-password-btn {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: rgb(245, 71, 72);
}

.show-icon {
  width: 20px;
  height: 20px;
}
.subsec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.checkbox-txt {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1rem;
}

.checkbox-txt input[type='checkbox'] {
  visibility: hidden;
}

.checkbox-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 1px solid #000;
  margin-top: 5px;
  margin-left: 10px;
}

/* Hover effect
.checkbox-txt:hover input ~ .checkbox-container {
  background-color: yellow;
}*/

/* Active effect
.checkbox-txt input:active ~ .checkbox-container {
  background-color: red;
}*/

/* Checked effect */
.checkbox-txt input:checked ~ .checkbox-container {
  background-color: rgb(245, 71, 72);
}

/* Checkmark */
.checkbox-container::after {
  content: '';
  position: absolute;
  display: none;
  left: 7px;
  top: 3px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Display checkmark when checked */
.checkbox-txt input:checked ~ .checkbox-container::after {
  display: block;
}

.submit-btn {
  width: 80%;
  height: 3rem;
  border: 1px solid rgb(245, 71, 72);
  border-radius: 5px;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  background-color: rgb(245, 71, 72);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}
.question {
  margin-left: 15%;
  margin-top: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgb(0, 0, 0);
}
.link {
  color: rgb(245, 71, 72);
  cursor: pointer;
}
.link:hover {
  text-decoration: underline;
}

.error-message {
  font-size: 13px;
  color: red;
  margin-top: 20px;
  margin-left: 30%;
}

.signin-google {
  width: 50%;
  height: 3rem;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  margin-left: 25%;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.signin-google:hover {
  transform: scale(1.05, 1.05) translate3d(0, 0, 0);
}

.or {
  font-size: 1rem;
  font-weight: 500;
  margin-top: 10px;
  margin-left: 45%;
  color: #000;
}

.google-img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-top: 5px;
}

.google-txt {
  font-size: 0.8rem;
  font-weight: 700;
  color: #000;
  padding: 2px;
}
</style>
