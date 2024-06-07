<template>
  <NavbarComponent />

  <div class="container">
    <div>
      <h1>Contact Us</h1>
      <form @submit.prevent="handleSubmit">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required />
        <br />
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
        <br />
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" required></textarea>
        <br />
        <button type="submit">Send</button>
      </form>
    </div>

    <div>{{ name }}</div>
    <div>{{ email }}</div>

    <div>{{ message }}</div>

    <div class="map-container">
      <GoogleMap
        id="maps"
        api-key="AIzaSyA_oV-K7GiDOkuTNpBpVRH7653AaDMqPWk"
        :center="location"
        :zoom="15"
        style="width: 100%; height: 500px; margin-left: 2%"
      >
        <Marker :options="{ position: location }" />
      </GoogleMap>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactUsView'
}
</script>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { ref } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

const name = ref('')
const email = ref('')
const message = ref('')

const location = {
  lat: 5.558523638918167,
  lng:  -0.15592359122145275
}
 
const handleSubmit = () => {
  // Add your form submission logic here
  console.log(name.value, email.value, message.value)

  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style></style>
