<template>
  <NavbarComponent />

  <div class="cart-box">
    <div class="cart-item" v-for="item in store.getCartItems" :key="item.id">
      <div class="selected">
        <div class="sub-selected">
          <div class="selected-item-image">
            <img class="selected-img" :src="item.image" />
          </div>

          <div class="quantity">
            <p class="quantity-txt">Quantity : {{ item.quantity }}</p>
          </div>
        </div>

        <div class="sub-selected2">
          <div class="item-name">
            <p class="name-txt">{{ item.name }}</p>
          </div>

          <div class="item-price">
            <p class="price-txt">Price : GH&#8373;{{ item.price }}.00</p>
          </div>
        </div>

        <div class="add-removebtn-sec">
          <button class="add-rembtn" id="addbtn" @click="store.incrementQuantity(item)">+</button>
          <button class="add-rembtn" id="removebtn" @click="store.decrementQuantity(item)">
            -
          </button>
        </div>
      </div>
      <div class="remove-item">
        <button class="remove-btn" @click="store.removeFromCart(item)">
          <span><img class="delete" src="/icons/delete.png" alt="" /></span>
        </button>
      </div>
    </div>

    <div class="checkout-sec">
      <RouterLink to="/checkout"><button class="checkout-btn">checkout</button></RouterLink>
      <p class="total-price">
        Total : GH&#8373;{{
          store.cartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0)
        }}.00
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartView'
}
</script>
<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import { productsStore } from '@/stores/counter'

const store = productsStore()
</script>

<style scoped>
.cart-box {
  width: 90%;
  height: auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.cart-item {
  width: 90%;
  height: 9.5rem;
  margin-top: 50px;
  margin-left: 40px;
  margin-right: 40px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sub-selected {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sub-selected2 {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 40px;
  margin-left: 0px;
}

/*image section*/
.selected-item-image {
  width: 5rem;
  height: 6rem;
  margin-left: 15px;
  margin-top: 10px;
}

.selected-img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/*quantity section*/
.quantity {
  margin-left: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 6.2rem;
  height: 1.7rem;
}

.quantity-txt {
  font-size: 0.9rem;
  margin-left: 5px;
  font-weight: 400;
}

/*name section*/
.item-name {
  margin-top: 15px;
  margin-bottom: 5px;
  width: 10rem;
  height: 2rem;
}

.name-txt {
  display: flex-end;
  font-size: 1.2rem;
  font-weight: 500;
  overflow-wrap: break-word;
  text-align: center;
}

/* Price section*/
.item-price {
  width: 10rem;
  height: 1.6rem;
  margin-left: 15px;
}

.price-txt {
  display: flex-start;
  font-size: 1rem;
  font-weight: 400;
}

/*Add and remove Button*/
.add-removebtn-sec {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-top: 45px;
  gap: 20px;
}

.add-rembtn {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
}

#addbtn {
  color: white;
  background-color: rgb(245, 71, 72);
}

#removebtn {
  background-color: transparent;
  border: 1px solid black;
}

.checkout-sec {
  width: 78%;
  display: flex;
  margin: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-evenly;
}

.checkout-btn {
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: 4rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
  width: 226px;
  height: 4rem;
  border-radius: 15px;
  background-color: rgb(245, 71, 72);
  border: none;
}

.checkout-btn:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
  background-color: rgb(245, 71, 72);
  color: rgb(255, 255, 255);
}

.checkout-btn:active {
  background-color: rgb(245, 71, 72);
  color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-weight: 600;
}

.total-price {
  margin-top: 30px;
  margin-left: auto;
  margin-right: 5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(48, 30, 8);
}

.remove-item {
  width: 20%;
  height: 1rem;
  display: flex;
  justify-content: center;
  margin: auto;
}

.remove-btn {
  width: fit-content;
  height: 1.8rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.delete {
  width: 1.1rem;
  height: 1.1rem;
  margin-top: 5px;
}
</style>
