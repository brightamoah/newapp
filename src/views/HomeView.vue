<template>
  <NavbarComponent />
  <div class="home">
    <div class="home-top">
      <div class="txt-sec">
        <h1 class="first-txt">Best Restaurant <br />In <span class="txt2">Town</span></h1>
        .

        <p class="sub-txt">
          We provide the best food in town, we proivde home delivery and dine in services
        </p>
        <div class="btns">
          <RouterLink to="/menu"><button class="order-now">Order Now</button> </RouterLink>
          <RouterLink to="/reservation">
            <button class="reservation">Reservation</button>
          </RouterLink>
        </div>
      </div>

      <div class="plate">
        <img class="spag-pic" src="/images/img_illustration.png" alt="" />
      </div>
    </div>

    <div class="popular-sec">
      <div>
        <img class="front-jollof" src="/images/Beef_jollof_dinner.jpg" alt="" />
      </div>

      <div class="side-txt">
        <div>
          <h2 class="first-txt">Our Most <br />Popular <span class="txt2">Dish.</span></h2>

          <p class="sub-txt" id="sub-txt">
            This dish is full of flavor and nutrition! Beef Jollof is a complete meal, providing all
            the essential nutrients your body needs, and is also a good source of fiber. It comes
            with an Egg, Coleslaw, Special Sauce, and Green or Black Pepper Sauce
          </p>
        </div>

        <div>
          <button class="order-now2">Order now</button>
        </div>
      </div>
    </div>
  </div>

  <div class="pop-menu">
    <div class="title">
      <h1 class="pop-title">Our Popular <span class="pop-txt2">Menu.</span></h1>
    </div>

    <MenuListComponent />
  </div>

  <!-- card that displays the food -->
  
  <div class="card-sec">
    <card class="menu-items" v-for="product in store.products" :key="product.id">
      <div class="food-container">
        <img class="food" :src="product.image" :alt="product.name" />
      </div>

      <div class="food-desc">
        <h2 class="food-name">{{ product.name }}</h2>

        <p class="description">
          {{ product.description }}
        </p>
      </div>

      <div class="star-sec">
        <star-rating
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
      </div>

      <div class="food-price">
        <p class="price">GH&#8373;{{ product.price }}.00</p>
        <button class="add-to-cart" @click="store.addToCart(product)">Add to cart</button>
      </div>
    </card>
  </div>

  <div class="review-container">
    <h2 class="review-username" style="text-align: center; font-size: 2rem; padding: 1rem">
      Ratings And Reviews
    </h2>
    <el-carousel :interval="4000" type="card" height="460px" indicator-position="none">
      <el-carousel-item v-for="review in allReviews" :key="review.id">
        <div class="review-content" text="2xl" justify="center">
          <p class="review-username">{{ review.username }}</p>
          <img class="review-image" :src="review.image" :alt="review.productID" />
          <div class="star-sec">
            <star-rating
              class="star"
              :show-rating="false"
              star-size="30"
              active-color="#f54748"
              :increment="0.1"
              glow="2"
              :active-on-click="true"
              v-model:rating="review.rating"
              :read-only="true"
              id="review-star"
            ></star-rating>
          </div>
          <p class="review-rating">Rating: {{ review.rating }}</p>
          <p class="review-comment">
    Comment
            <br />
                    <span id="review" >{{ review.comment }}</span>
          </p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

  <FooterComponent />
</template>
<script>
export default {
  name: 'HomeView'
}
</script>
<script setup>
import FooterComponent from '@/components/FooterComponent.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import StarRating from 'vue-star-rating'
import { productsStore } from '@/stores/counter'
import MenuListComponent from '@/components/MenuListComponent.vue'
import { useReviewStore } from '@/stores/ReviewsStore'
import { computed, onMounted } from 'vue'

const store = productsStore()
const reviewStore = useReviewStore()
const averageRatings = reviewStore.averageRatings

// const reviews = ref([])
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const allReviews = computed(() => {
  // Flatten the reviews from the store
  const reviews = Object.values(reviewStore.reviews).flat()
  return shuffleArray(reviews)
})

onMounted(async () => {
  await reviewStore.calculateAllAverageRatingsAndUpdateFirestore()
})
</script>

<style>
.home {
  width: 100%;
  height: auto;
  margin-top: 70px;             
}

.home-top {
  width: 45rem;
  display: flex;
  margin-left: 17%;
}

.first-txt {
  font-size: 3.75rem;
  font-weight: 600;
  color: rgb(48, 30, 8);
}

.txt2 {
  font-size: 3.75rem;
  font-weight: 700;
  color: rgb(245, 71, 72);
}

.txt-sec {
  margin-top: 2.75em;
}

.plate {
  width: 586px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
}

.sub-txt {
  height: 80px;
  font-size: 1.5em;
  width: 490px;
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.order-now {
  width: 232px;
  height: 82px;
  background-color: rgb(245, 71, 72);
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 25px;
  font-weight: 500;
  margin-right: 20px;
  margin-top: 25px;
  text-align: center;
  cursor: pointer;
}

.order-now:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.order-now:active {
  background-color: white;
  color: rgb(245, 71, 72);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 600;
}

.reservation {
  width: 232px;
  height: 82px;
  border-radius: 15px;
  border: none;
  background-color: rgb(249, 232, 232);
  color: rgb(245, 71, 72);
  font-size: 25px;
  font-weight: 500;
  margin-top: 25px;
  text-align: center;
  cursor: pointer;
}

.reservation:active {
  background-color: rgb(245, 71, 72);
  color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 600;
}

.reservation:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.spag-pic {
  width: 33.125rem;
  height: auto;
}

/*Popular section */
.popular-sec {
  width: 100%;
  height: auto;
  margin-top: 189px;
  background-color: rgb(231, 247, 237);
  display: flex;
  justify-content: space-evenly;
  margin-left: 0px;
}

.front-jollof {
  width: 28.125rem;
  height: auto;
  margin-left: 80px;
  margin-top: 10px;
  border-radius: 15px;
}

#sub-txt {
  width: 374px;
  text-align: justify;
}

.side-txt {
  display: flex;
  flex-direction: column;
}

.order-now2 {
  margin-top: 220px;
  margin-left: 90px;
  width: 232px;
  height: 82px;
  background-color: rgb(245, 71, 72);
  border: none;
  border-radius: 15px;
  font-size: 25px;
  font-weight: 500;
  color: white;
  text-align: center;
  cursor: pointer;
}

/*Heading before the menu section*/
.title {
  margin-top: 9.375rem;
  text-align: center;
}

.pop-title {
  font-size: 5rem;
  font-weight: 700;
  color: rgb(48, 30, 8);
}

.pop-txt2 {
  font-size: 5rem;
  font-weight: 700;
  color: rgb(245, 71, 72);
}

/*container for the menu category buttons*/

/*card for menu items */
.card-sec {
  display: flex;
  align-items: center;
  margin-top: 70px;
  margin-left: 10px;
  justify-content: space-evenly;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.menu-items {
  width: 18.688rem;
  height: auto;
  border-radius: 20px;
  text-align: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 10px;
}

/*food pic section*/
.food-container {
  height: 16rem;
  width: 14rem;
  margin-left: 34px;
  margin-top: 30px;
}

.food {
  width: 80%;
  height: 80%;
}

.food-name {
  font-size: 1.5rem;
  color: rgb(48, 30, 8);
  font-weight: 700;
}

/*food description section*/
.food-desc {
  height: auto;
  width: 14rem;
  margin-left: 34px;
  margin-top: 0px;
}

.description {
  width: 95%;
  font-size: 1rem;
  color: rgb(0, 0, 0);
  font-weight: 500;
  margin-top: 5px;
  margin-left: 5px;
  text-align: center;
}

/*Star section */
.star-sec {
  width: 50%;
  height: auto;
  margin-top: 20px;
  margin-left: 25%;
}

/*food price section*/
.food-price {
  width: 16.9rem;
  height: 4rem;
  margin-left: 35px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.3rem;
  color: rgb(0, 0, 0);
  font-weight: 700;
}

.add-to-cart {
  width: 8.5rem;
  height: 2.8rem;
  background-color: rgb(245, 71, 72);
  border: none;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 500;
  color: white;
  text-align: center;
  cursor: pointer;
  margin-right: 15px;
}

.view-more {
  margin-top: 140px;
  margin-left: 45%;
}

#badge {
  background-color: red;
}

.review-container {
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.el-carousel__item h3 {
  color: rgba(249, 212, 232, 2);
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: rgb(249, 232, 232);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: rgb(249, 232, 232);
}

.review-content {
  text-align: center;
  color: #333;
}

.review-username {
  font-size: 1.5rem;
  font-weight: bold;
}

.review-rating,
.review-comment {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  text-align: center;
}

.review{
  width: 10px;
}

.review-image {
  width: 5rem;
  height: auto;
}

#review-star {
  margin-left: 27%;
}

@media only screen and (max-width: 800px) {
  #review-star {
    margin-left: -1%;
  }
}
</style>
