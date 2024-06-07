<!-- <template>
  <form class="checkout-form">
    <div class="form-group1">
      <input
        class="form-input"
        type="text"
        name="first-name"
        id="first-name"
        v-model="firstName"
        placeholder="First Name"
      />
    </div>
    <div class="form-group1">
      <input
        class="form-input"
        type="text"
        name="last-name"
        id="last-name"
        v-model="lastName"
        placeholder="Last Name"
      />
    </div>

    <div class="form-group1">
      <input
        class="form-input"
        type="text"
        name="phonenumber"
        id="phoneNumber"
        v-model="phoneNumber"
        placeholder="phone"
      />
    </div>
    <paystack
      :amount="amount * 100"
      :email="email"
      :paystackkey="PUBLIC_KEY"
      :reference="reference"
      :callback="processPayment"
      :close="close"
    >
      Make Payment
    </paystack>
  </form>
</template>
<script>
export default {}
</script>

<script setup>
import paystack from 'vue3-paystack'
import { ref, computed } from 'vue'
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phoneNumber = ref('')
const amount = ref(0)

const reference = computed(() => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
})

const processPayment = () => {
  window.alert('Payment received')
}

const close = () => {
  window.alert('You closed checkout page')
}
</script>
<style></style> -->

<template>
  <div>
    hello
  </div>
</template>