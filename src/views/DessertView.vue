<template>
  <NavbarComponent />
  <MenuListComponent />
  <div class="card-sec">
    <card class="menu-items" v-for="product in store.desserts" :key="product.id">
      <div class="food-container">
        <img class="food" :src="product.image" alt="rice/fish" />
      </div>

      <div class="food-desc">
        <h2 class="food-name">{{ product.name }}</h2>

        <p class="description">
          {{ product.description }}
        </p>

        <star-rating
          class="star"
          :show-rating="false"
          star-size="30"
          active-color="#f54748"
          :increment="1"
          glow="2"
          :active-on-click="true"
          v-model:rating="rating"
        ></star-rating>
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
import MenuListComponent from '@/components/MenuListComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { productsStore } from '@/stores/counter'

const store = productsStore()
</script>
<style></style>
