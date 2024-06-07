<template>
  <NavbarComponent />

  <div class="date">{{ date }}</div>
  <!-- <div v-if="loading" class="loading-spinner"></div> -->
  <div class="dashboard-container">
    <div class="profile-sec">
      <img class="profile-pic" :src="authStore.activeUser.profilePicture" />

      <img class="profile-pic" src="/icons/profile.png" alt="avatar"  v-if="!gravatarUrl">

      <div class="user-info">
        <summary>User information</summary>

        <div class="info-section">
          <p class="info-text">Name: {{ authStore.activeUser.displayName }}</p>
        </div>

        <div class="info-section">
          <p class="info-text">Phone: {{ phone }}</p>
        </div>

        <div class="info-section">
          <p class="info-text">Email: {{ authStore.activeUser.email }}</p>
        </div>

        <div class="info-section">
          <p class="info-text">UserID: {{ authStore.activeUser.uid }}</p>
        </div>
      </div>
    </div>

    <!-- <details>
      <summary id="main">Orders</summary> -->

    <div v-if="loading" class="loading-spinner">
      <half-circle-spinner :animation-duration="1000" :size="60" color=" #f54748" />
    </div>

    <div v-else v-for="(order, orderId) in orders" :key="orderId">
      <summary>Order Date: {{ order.date }}</summary>
      <summary id="sub">Order ID: {{ orderId }}</summary>
      <div class="orders-container">
        <div v-for="item in order.items" :key="item.name">
          <div class="orders">
            <div class="ordered-items">
              <section class="image-quantity">
                <div class="selected-item-image">
                  <img class="selected-img" :src="item.image" />
                </div>
                <div class="quantity">
                  <p class="quantity-txt">Quantity : {{ item.quantity }}</p>
                </div>
              </section>
              <section class="price-name">
                <div class="item-name">
                  <p class="name-txt">{{ item.name }}</p>
                </div>
                <div class="item-price">
                  <p class="price-txt">Price : GH&#8373;{{ item.amount * item.quantity }}.00</p>
                </div>
              </section>
            </div>
            <button class="review-btn" @click="reviewStore.reviewItem(item)">review</button>
          </div>
        </div>
      </div>
    </div>

    <!-- </details> -->
  </div>

  <!-- Review Modal -->
  <div class="modal" v-if="reviewStore.showModal">
    <div class="modal-content">
      <span class="close" @click="reviewStore.closeModal">&times;</span>
      <h2>Leave a Review</h2>
      <form @submit.prevent="reviewStore.submitReview">
        <input
          class="input"
          type="text"
          id="name"
          :value="authStore.activeUser.displayName"
          required
        />
        <p class="item-name-txt">{{ reviewStore.selectedItem.name }}</p>
        <img
          class="item-image"
          :src="reviewStore.selectedItem.image"
          :alt="reviewStore.selectedItem.name"
        />
        <star-rating
          id="star"
          class="star"
          :show-rating="false"
          rating="1"
          star-size="30"
          active-color="#f54748"
          :increment="1"
          glow="2"
          :active-on-click="true"
          v-model:rating="reviewStore.rating"
          required
        ></star-rating>
        <div>
          <textarea class="reviewbox" v-model="reviewStore.comment" required></textarea>
        </div>

        <div class="button">
          <button type="submit" style="height: 2rem">Submit Review</button>
        </div>
      </form>
    </div>
  </div>

  <FooterComponent />
</template>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { useReviewStore } from '@/stores/ReviewsStore'
import { HalfCircleSpinner } from 'epic-spinners'
// import { productsStore } from '@/stores/counter'
// import { useDatabaseStore } from '@/stores/DatabaseStore.js'
import { onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { db } from '@/firebase/init.js'
import { ref } from 'vue'
import StarRating from 'vue-star-rating'
import CryptoJS from "crypto-js"

const authStore = useAuthStore()
const reviewStore = useReviewStore()
const loading = ref(true)
// const store = productsStore()
// const email = ref('')
const phone = ref('')
const date = ref('')
// const clicked = ref(false)
let orders = ref([])
let userId
const  email  = ref('')
const size = 200 // Optional size parameter
const gravatarUrl = getGravatarUrl(email, size)

// const comment = ref('')
// let showModal = ref(false)

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const hour = today.getHours()
  const minute = today.getMinutes()
  const second = today.getSeconds()
  return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

onMounted(() => {
  setInterval(() => {
    date.value = getCurrentDate()
  }, 1000) // Update every 1000 milliseconds (1 second)
})

onMounted(async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId = user.uid
      console.log(userId)
    }
  })

  const querySnapshot = await getDocs(collection(db, 'users'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data())

    if (userId === doc.id) {
      phone.value = doc.data().phone
      email.value = doc.data().email
      console.log('phone updated successfully',email.value)
    } else {
      console.log('No user data found')
    }
  })

  const querySnapshotOrders = await getDocs(collection(db, 'orders'))
  querySnapshotOrders.forEach((doc) => {
    if (userId === doc.id) {
      orders.value = doc.data().orders
    }
  })
  console.log('orders:', orders.value)
  loading.value = false // Data loading completed
})

  function getGravatarUrl(email, size = 80) {
    const trimmedEmail = email.value.trim().toLowerCase()
    const hash = CryptoJS.SHA256(trimmedEmail).toString(CryptoJS.enc.Hex)
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`
}

</script>

<style scoped>
.dashboard-container {
  width: 85%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 10px;
}

.profile-sec {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.profile-pic {
  width: 10rem;
  height: 10rem;
  border: 2px solid rgba(0, 0, 0, 0.4);
  border-radius: 50%;
}

.user-info,
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1rem;
  width: 50%;
}

.info-section,
.set-text {
  font-size: 1.15rem;
  height: auto;
  font-weight: 600;
  margin-top: 1rem;
  width: 100%;
  text-align: center;
  background-color: rgb(0, 7, 8, 0.1);
  border-radius: 10px;
  color: rgba(0, 0, 0, 1);
}

.info-text {
  width: 100%;
  align-items: center;
  text-align: center;
}

.settings {
  margin: 0 auto;
  margin-top: 1.5rem;
}

.set-text:hover {
  cursor: pointer;
  background-color: rgb(245, 71, 72);
  color: rgba(255, 255, 255, 1);
}

summary {
  font-size: 1rem;
  font-weight: 500;
}

#main {
  font-size: 1.4rem;
  color: rgb(245, 71, 72);
}

#sub {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgb(245, 71, 72);
}

.date {
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  margin-right: 11%;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* Orders Section */
.orders-container {
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 90%;
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
}

.orders {
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 10px;
}

.ordered-items {
  display: flex;
  justify-content: space-evenly;
}

/*image section*/
.selected-item-image {
  width: 3rem;
  height: 4rem;
  margin-left: 15px;
  margin-top: 10px;
}

.selected-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

/*quantity section*/
.quantity {
  margin-left: 5px;
  width: auto;
  height: auto;
}

.quantity-txt {
  font-size: 0.8rem;
  margin-left: 5px;
  font-weight: 600;
}

/*name section*/
.item-name {
  margin-top: 10px;
  width: auto;
  height: 2rem;
}

.name-txt {
  font-size: 0.85rem;
  font-weight: 500;
  overflow-wrap: break-word;
}

/* Price section*/
.item-price {
  width: 10rem;
  height: 1.6rem;
}

.price-txt {
  display: flex-start;
  font-size: 0.8rem;
  font-weight: 600;
}

.review-btn {
  width: 40%;
  height: 1.4rem;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: none;
  color: #fefefe;
  background-color: rgb(245, 71, 72);
  border-radius: 6px;
}

/* Style for the review modal */
.modal {
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 50%;
  top: 50%;
  display: flex;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  transform: translate(-50%, -50%);
}

.reviewbox {
  width: 60%;
  height: 5rem;
  margin-left: 20%;
}

.star {
  margin-left: 33%;
  margin-bottom: 10px;
  margin-top: 10px;
}

.button {
  margin: 5%;
  margin-left: 42%;
}

.input {
  width: 50%;
  height: 2rem;
  margin-left: 25%;
  text-align: center;
}

h2 {
  margin-left: 40%;
  margin-bottom: 10px;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.item-image,
.item-name-txt {
  width: 20%;
  margin-left: 35%;
}

.loading-spinner {
  margin: 20% auto;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #f54748;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 800px) {
  .user-info,
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 1rem;
    width: 100%;
  }

  .info-section,
  .set-text {
    font-size: 1rem;
    height: auto;
    font-weight: 600;
    margin: 0 auto;
    margin-top: 1rem;
    width: 90%;
    text-align: center;
    background-color: rgb(0, 7, 8, 0.1);
    border-radius: 10px;
    color: rgba(0, 0, 0, 1);
  }

  .date {
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
    margin-right: 11%;
    margin-bottom: 1rem;
  }

  .orders {
    width: 100%;
  }

  .orders-row {
    width: auto;
    margin: 10px;
  }

  .reviewbox {
    width: 80%;
    margin-left: 8%;
  }

  .star {
    margin-left: 25%;
  }

  .button {
    margin-left: 30%;
  }

  h2 {
    margin-left: 24%;
    margin-bottom: 10px;
  }
}
</style>
