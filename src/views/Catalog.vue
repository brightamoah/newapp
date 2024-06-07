<template>
  <NavbarComponent />
  <MenuListComponent />
  <div class="cat" ref="">
    <h1>Catalog</h1>
    <div class="products-list">
      <div class="product" v-for="product in store.products" :key="product.id">
        <img :src="product.image" alt="" />
        <h2>{{ product.name }}</h2>
        <br />
        <p>{{ product.description }}</p>
        <br />
        <p>GH&#8373; {{ product.price }}.00</p>
        <br />
        <button @click="store.addToCart(product)" class="add-to-cart">Add to cart</button>
      </div>

      <div class="product" v-for="product in store.drinks" :key="product.id">
        <img :src="product.image" alt="" />
        <h2>{{ product.name }}</h2>
        <br />
        <p>{{ product.description }}</p>
        <br />
        <p>GH&#8373; {{ product.price }}.00</p>
        <br />
        <button @click="store.addToCart(product)" class="add-to-cart">Add to cart</button>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>
<script>
export default {
  name: 'CatalogView'
}
</script>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import MenuListComponent from '@/components/MenuListComponent.vue'
import { onMounted } from 'vue'
import { productsStore } from '@/stores/counter.js'
import FooterComponent from '@/components/FooterComponent.vue'

// console.log(props, 'Catalog');

const store = productsStore()
onMounted(async () => {
  // await store.fetchProductsFromDB()

  console.log('Mounted', store.products)
})
</script>

<style>
.products-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.product {
  flex-basis: 28%;
  padding: 16px;
  margin: 8px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.product img {
  width: 70%;
}
</style>
