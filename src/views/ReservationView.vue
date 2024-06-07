<template>
  <NavbarComponent />

  <div class="reserve">
    <section class="image-sec">
      <img class="back-image" src="/images/bgreserve.png" />
    </section>

    <section class="form-sec">
      <div class="head-container">
        <h2 class="heading">Reservation Form</h2>
      </div>

      <div class="form">
        <form
          class="gform"
          ref="form"
          action="https://script.google.com/macros/s/AKfycbzuG3ea4BPkC27joSKGPmDTxtNqvP5cyXiNjeC_IRfpLhsyxmM7DMbxLvtUmfPxWmJw_A/exec"
          method="POST"
          data-email="example@email.com"
        >
          <div class="form-group1">
            <label for="name">Name:</label>
            <input type="text" v-model="name" name="Name" placeholder="Enter Your Name" required />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              v-model="email"
              name="Email"
              placeholder="Enter Your Email Address"
              required
            />
          </div>

          <div class="form-group">
            <label>Date(Month/Day/Year):</label>
            <input
              type="date"
              v-model="date"
              :min="currentDate"
              name="Date"
              @input="open"
              required
            />
          </div>

          <div class="form-group">
            <label>Time:</label>
            <select v-model="time" name="Time" class="time-sec" style="font-size: 1.1rem;" required>
              <option value="" disabled hidden>Select The time</option>
              <option v-for="time in availableTimes" :key="time" :value="time" style="font-size: 1.1rem;">
                {{ time }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="guests">Number of Guest(Maximum of {{ maxGuests }}):</label>
            <input
              type="number"
              id="guests"
              @input="maxGuest"
              v-model="guests"
              name="Guests"
              :placeholder="'Maximum Of ' + maxGuests + ' Guests'"
              :max="maxGuests"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              v-model="phone"
              name="Phone Number"
              placeholder="Enter Your Phone Number"
              @input="formatPhoneNumber"
              required
            />
          </div>

          <div class="submit-btn">
            <button class="book-now" :disabled="sending">
              <span class="spinner" style="display: flex; justify-content: center" v-if="sending">
                <spring-spinner :animation-duration="1000" :size="30" color="#ffff" />
              </span>

              <span v-else-if="submitted"> Submitted </span>

              <span v-else> Book Now</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>

  <div v-if="submitted && submittedEmail" class="modal">
    <div class="modal-content">
      <img src="/icons/success.gif" alt="success" />
      <h2 class="moadl-h2">Thank You For Booking A Reservation!</h2>
      <p class="modal-text">
        Your reservation has been successfully submitted and a confirmation email has been sent to
        {{ email }}.
      </p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { ref, nextTick, onMounted, computed, watch } from 'vue'
import { SpringSpinner } from 'epic-spinners'
import { collection, doc, getDoc, setDoc, updateDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/init.js'
// import router from '@/router/index.js'
import emailjs from 'emailjs-com'
import {  ElMessageBox } from 'element-plus'

const guests = ref()
const name = ref('')
const email = ref('')
const date = ref('')
const time = ref('')
const phone = ref('')
const form = ref(null)
const sending = ref(false)
const submitted = ref(false)
const maxGuests = ref(150)
const sendingEmail = ref(false)
const submittedEmail = ref(false)

const bookedTimes = ref([])
const bookedDates = ref([])

const reservations = ref({})

const currentDate = ref(new Date().toISOString().slice(0, 10)) // Get current date in MM-DD-YYYY format

const closeModal = () => {
  submitted.value = false
  submittedEmail.value = false

  // Reset the form
  name.value = ''
  email.value = ''
  phone.value = ''
  time.value = ''
  guests.value = ''
  date.value = ''
}

const maxGuest = () => {
  if (guests.value > maxGuests.value) {
    guests.value = maxGuests.value
  }
}
onMounted(async () => {
  nextTick(() => {
    form.value.addEventListener('submit', handleFormSubmit)
  })
})

async function fetchBookedTimes() {

  try {
    const bookedTimesRef = collection(db, 'reservations')
    const querySnapshot = await getDocs(bookedTimesRef)
    const bookedTimesArray = []
    const bookedGuestsArray = []
    const matchedDates = []

    // Reset maxGuests.value before processing reservations for each date
    maxGuests.value = 150

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log(doc.id)
      if (date.value === doc.id) {
        matchedDates.push(doc.id) // Store matched doc.id
        bookedTimesArray.push(...data.reservations.map((reservation) => reservation.time))
        bookedGuestsArray.push(...data.reservations.map((reservation) => reservation.guests))
        maxGuests.value =
          maxGuests.value - data.reservations.reduce((acc, curr) => acc + curr.guests, 0)
      }
    })

    // Check if date matches any doc.id
    if (matchedDates.length === 0) {
      // Reset maxGuests.value if no match found
      maxGuests.value = 150
      //Display a message to show that there is no available slots to book
    } else if (maxGuests.value === 0) {
      ElMessageBox.alert('This date is fully booked, please choose another date.', 'Fully Booked - Reservation Unavailable', {
        confirmButtonText: 'OK',
        center: true,
        confirmButtonClass: "book-now",
      
      })
    }

    bookedTimes.value = bookedTimesArray
    bookedDates.value = bookedGuestsArray
    console.table(bookedGuestsArray)
    console.log(bookedTimesArray)
    console.log(maxGuests.value)
    console.log(matchedDates)
    console.log(date.value)
    
  } catch (error) {
    console.error('Error fetching booked times:', error)
  }
}

watch(date, async () => {
  await fetchBookedTimes()
})

const availableTimes = computed(() => {
  const times = []
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute <= 30; minute += 30) {
      times.push(`${hour}:${minute.toString().padStart(2, '0')}`)
    }
  }
  return times.filter((time) => !bookedTimes.value.includes(time))
})

function formatPhoneNumber(event) {
  const phoneNumber = event.target.value
  if (phoneNumber.startsWith('0')) {
    phone.value = '+233' + phoneNumber.slice(1)
  }
}

async function handleFormSubmit(event) {
  sending.value = true
  // Add the selected time to the booked times array
  bookedTimes.value.push({ date: date.value, time: time.value })
  // Check if all times for the selected date are booked
  if (availableTimes.value.length === 0) {
    // Move to the next available date
    date.value = new Date(date.value).addDays(1).toISOString().split('T')[0]
    // Reset booked times for the new date
    bookedTimes.value = bookedTimes.value.filter((booking) => booking.date !== date.value)
  }

  // Create a new reservation object
  const reservationData = {
    time: time.value,
    name: name.value,
    email: email.value,
    phone: phone.value,
    guests: guests.value
  }

  // Add the reservation to the reservations object
  if (!reservations.value[date.value]) {
    reservations.value[date.value] = []
  }
  reservations.value[date.value].push(reservationData)

  // Log the reservations
  console.log('Reservations:', reservations.value)

  event.preventDefault()
  const formData = getFormData(form.value)
  console.log('Form Data', form.value)
  const data = formData.data

  // If a honeypot field is filled, assume it was done so by a spam bot.
  if (formData.honeypot) {
    return false
  }

  disableAllButtons(form.value)

  //Save the reservations in google sheet
  const url =
    'https://script.google.com/macros/s/AKfycbzuG3ea4BPkC27joSKGPmDTxtNqvP5cyXiNjeC_IRfpLhsyxmM7DMbxLvtUmfPxWmJw_A/exec'

  const xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      form.value.reset()
      const formElements = form.value.querySelector('.form__elements')
      if (formElements) {
        formElements.style.display = 'none' //hide form
      }

      const thankYouMessage = form.value.querySelector('.thankyou_message')
      if (thankYouMessage) {
        thankYouMessage.style.display = 'block'
      }
      submitted.value = true
      sending.value = false

      if (submitted.value === true) {
        // window.location.reload()
        setTimeout(() => {
          // router.push('/menu')
        }, 2000)
      }

      // }
      // showSuccessModal.value = true // show success modal
      // window.location.reload()
    }
  }

  //url encode form data before sending as post data
  const encoded = Object.keys(data)
    .map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    })
    .join('&')
  xhr.send(encoded)

  //Store the reservations in firebase firestore
  const reservationRef = doc(db, 'reservations', date.value)

  try {
    const docSnap = await getDoc(reservationRef)
    if (docSnap.exists && docSnap.data()) {
      const existingReservations = docSnap.data().reservations
      if (existingReservations) {
        // Update the existing document
        await updateDoc(reservationRef, {
          reservations: [...existingReservations, reservationData],
          maxGuests: maxGuests.value + guests.value // Update current guests
        })
      } else {
        // Create a new document
        await setDoc(reservationRef, {
          reservations: [reservationData],
          maxGuests: guests.value // Set initial current guests
        })
      }
    } else {
      // Create a new document
      await setDoc(reservationRef, {
        reservations: [reservationData],
        maxGuests: guests.value // Set initial current guests
      })
    }
  } catch (error) {
    console.error(error)
  }

  // Send the form data to EmailJS and then send user a confirmation email
  emailjs.sendForm('service_yavv8os', 'template_d33idru', form.value, '_2aGQwRNVE6vcsnv5').then(
    (result) => {
      console.log('You have successfully submitted your message', result.text)
      sendingEmail.value = false
      submittedEmail.value = true
    },
    (error) => {
      console.log(
        'This form failed to submit, please kindly check your internet connection',
        error.text
      )
      sendingEmail.value = false
    }
  )
}

function getFormData(form) {
  const elements = form.elements
  const data = {}

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    let name = element.name
    let value = element.value

    if (name) {
      data[name] = value
    }
  }

  return { data: data }
}

function disableAllButtons(form) {
  const buttons = form.querySelectorAll('button')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true
  }
}
</script>

<style scoped>
.reserve {
  width: 90%;
  height: 70%;
  margin: 0 auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
}

/* Image Section */
.image-sec {
  width: 40%;
}

.back-image {
  width: 100%;
  height: 100%;
}

/* form Section */
.form-sec {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.form-group {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
  margin-top: 1.3rem;
}

.form-group1 {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.head-container {
  margin: 0 auto;
}

.heading {
  width: 20rem;
  height: auto;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
}

input {
  width: 100%;
  height: 3.5rem;
  border-radius: 10px;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 500;
  text-indent: 5px;
  border-color: rgba(0, 0, 0, 0.5);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input:focus {
  border: 2px solid black;
  outline: none;
  opacity: 1;
}

select {
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  border: 2px solid black;
}

.submit-btn {
  width: 50%;
  height: 3.2rem;
  margin: 0 auto;
  margin-top: 1.5rem;
  margin-bottom: 1.2rem;
}

label {
  font-weight: 600;
}

.time-sec {
  border-color: rgba(0, 0, 0, 0.5);
  height: 3.5rem;
}

.book-now {
  width: 100%;
  height: 100%;
  background-color: rgb(245, 71, 72);
  color: white;
  border-radius: 15px;
  cursor: pointer;
  border: transparent;
  font-size: 1.2rem;
  font-weight: 600;
}
/* Modal section*/
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.modal-content h2 {
  margin-top: 0;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.modal-content button {
  background-color: rgba(245, 71, 72, 01);
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 15%;
}

.modal-content button:hover {
  background-color: rgb(216, 60, 60);
}
</style>
