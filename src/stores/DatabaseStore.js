import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/init.js'
// import moment from 'moment'

export const useDatabaseStore = defineStore('reservationDatabase', () => {
  const database = ref([])
  const name = ref('')
  const email = ref('')
  const phone = ref('')
  const guests = ref()

  onMounted(() => {
    onSnapshot(collection(db, 'reservations'), (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        const reservation = {
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          numberGuests: doc.data().guests,
          dateReserve: doc.data().dateTime.toDate(),
          phoneNumber: doc.data().phone
        }
        data.push(reservation)
      })
      database.value = data
      console.log('database =', database)
    })
  })

  // Add a new document with a generated id.
  const docRef = addDoc(collection(db, 'reservations'), {
    name: name.value,
    email: email.value,
    phone: phone.value,
    guests: guests.value
  })
  console.log('Document written with ID: ', docRef.id)
  // dateTime: Timestamp.fromDate(new Date(dateTime.value))
  return {
    database
  }
})
