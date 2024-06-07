<template>
  <div class="card-sec">
    <card class="menu-items" v-for="product in store.products" :key="product.id">
      <div class="food-container">
        <img class="food" :src="product.image" alt="rice/fish" />
      </div>

      <div class="food-desc">
        <h2 class="food-name">{{ product.name }}</h2>
        <p>{{ product.id }}</p>

        <p class="description">
          {{ product.description }}
        </p>

        <star-rating
          id="star"
          class="star"
          :show-rating="false"
          star-size="30"
          active-color="#f54748"
          :increment="0.5"
          glow="2"
          :active-on-click="true"
          v-model:rating="product.rating"
        ></star-rating>

        <div>{{ rating }}</div>
      </div>

      <div class="food-price">
        <p class="price">GH&#8373;{{ product.price }}.00</p>
        <button class="add-to-cart" @click="store.addToCart(product)">Add to cart</button>
      </div>
    </card>
  </div>

  <star-rating
    id="star"
    class="star"
    :show-rating="false"
    star-size="30"
    active-color="#f54748"
    :increment="0.5"
    glow="2"
    :active-on-click="true"
    v-model:rating="averageRating"
  ></star-rating>

  <div>{{ averageRating }} ({{ reviewsCount }})</div>

  <div class="reviews">
    <div v-for="review in reviews" :key="review">
      <p>{{ review.username }} - {{ review.rating }} stars</p>
      <p>{{ review.review }}</p>
    </div>
  </div>

  <form @submit.prevent="addReview">
    <input type="text" v-model="newReview.username" placeholder="Username" />
    <star-rating
      id="new-star"
      class="star"
      :show-rating="false"
      star-size="30"
      active-color="#f54748"
      :increment="0.5"
      glow="2"
      :active-on-click="true"
      v-model:rating="product.rating"
    ></star-rating>
    <textarea v-model="newReview.review" placeholder="Write a review"></textarea>
    <button type="submit">Add Review</button>
  </form>

  <!-- ... existing code ... -->
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../firebase/init'
import { productsStore } from '@/stores/counter'
import StarRating from 'vue-star-rating'

const store = productsStore()
const averageRating = ref(0)
const reviews = ref([])
const newReview = ref({
  username: '',
  rating: 0,
  review: ''
})
const reviewsCount = ref(0)

onMounted(async () => {
  const reviewsCol = collection(db, 'reviews')
  const reviewsSnapshot = await getDocs(reviewsCol)
  reviews.value = reviewsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  calculateAverageRating()
})

// Add a rating property to each product
store.products.forEach((product) => {
  product.rating = 0
})

function calculateAverageRating() {
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  averageRating.value = sum / reviews.value.length
  reviewsCount.value = reviews.value.length
}

function addReview() {
  const reviewsCol = collection(db, 'reviews')
  addDoc(reviewsCol, {
    productId: store.products.name,
    username: newReview.value.username,
    rating: newReview.value.rating,
    review: newReview.value.review
  })
  reviews.value.push({ ...newReview.value, id: store.products.name })
  calculateAverageRating()
  newReview.value = {
    username: '',
    rating: 0,
    review: ''
  }
}
</script>
