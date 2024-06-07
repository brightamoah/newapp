<template>
  <div class="password-container">
    <input
      class="input"
      id="passwordbox"
      :type="passwordFieldType.value"
      v-model="data.password"
      placeholder="Password"
      required
    />
    <button @click="togglePasswordFieldType" type="button" class="show-password-btn">
      <span v-if="passwordFieldType.value === 'password'">
        <img class="show-icon" src="/icons/view.png" alt="Show password" />
      </span>
      <span v-else>
        <img class="show-icon" src="/icons/invisible.png" alt="Hide password" />
      </span>
    </button>
    <input
      class="input"
      id="confirm-passwordbox"
      type="password"
      v-model="confirmPassword"
      placeholder="Confirm Password"
      required
    />
  </div>
</template>

<script>
export default {
  name: 'PasswordComponent'
}
</script>

<script setup>
import { ref } from 'vue'

// const props = { formData: Object }

const passwordFieldType = ref('password')
const confirmPassword = ref('')

const togglePasswordFieldType = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
}
</script>
