<template>
  <NavbarComponent />
  <MenuListComponent />
 
  <div class="card-sec">
    <card class="menu-items" v-for="product in store.products" :key="product.id">
      <div class="food-container">
        <img class="food" :src="product.image" alt="rice/fish" />
      </div>

      <div class="food-desc">
        <h2 class="food-name">{{ product.name }}</h2>

        <p class="description">
          {{ product.description }}
        </p>

        <star-rating
          id="star"
          class="star"
          :show-rating="false"
          star-size="30"
          active-color="#f54748"
          :increment="0.1"
          glow="2"
          :active-on-click="true"
          v-model:rating="averageRatings[product.id]"
          :read-only="true"
        ></star-rating>

        <div v-if="averageRatings[product.id] !== undefined">
          {{ averageRatings[product.id] }} ({{ reviewsCount[product.id] }})
        </div>
      </div>

      <div class="food-price">
        <p class="price">GH&#8373;{{ product.price }}.00</p>
        <button class="add-to-cart" @click="store.addToCart(product)">Add to cart</button>
      </div>
    </card>
  </div>
  <FooterComponent />
</template>
<script>
export default {}
</script>

<script setup>
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import StarRating from 'vue-star-rating'
import MenuListComponent from '@/components/MenuListComponent.vue'
import { productsStore } from '@/stores/counter'
// import { ref } from 'vue'
import { useReviewStore } from '@/stores/ReviewsStore'

const store = productsStore()
const reviewStore = useReviewStore()

const averageRatings = reviewStore.averageRatings
const reviewsCount = reviewStore.reviewsCount
console.log(reviewsCount)
</script>

<style scoped>
/*Star section */
#star {
  width: 50%;
  height: auto;
  margin-left: 35px;
  margin-top: 20px;
}

</style>
