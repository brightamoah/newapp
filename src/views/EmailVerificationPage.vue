<template>
  <div class="verify-box">
    <h1>Email Verification</h1>
    <br />
    <p>Please verify your email address to continue</p>
    <br />
    <p>Check your email inbox or spam folder to access the verification link sent to you</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { getAuth } from 'firebase/auth'
import router from '@/router'

let unsubscribe

onMounted(async () => {
  const auth = getAuth()
  const user = auth.currentUser
  console.log(user)
  unsubscribe = auth.onAuthStateChanged((user) => {
    if (user?.emailVerified) {
      // Direct user to home page
      user.reload()
      console.log('Email verified')

      router.push('/')
    }
  })
})

onUnmounted(() => {
  unsubscribe()
  console.log('Unmounted', unsubscribe.value)
})
</script>

<style scoped>
.verify-box {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 10%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

p {
  font-size: 1.15rem;
  font-weight: 400;
}
</style>
