<template>
  <NavbarComponent />

  <div class="checkout-box">
    <h1 class="checkout-title">Checkout</h1>

    <div class="checkout-container">
      <div class="checkout-payment">
        <h2 id="delivery-info">Delivery Information</h2>

        <!-- <form class="checkout-form" id="checkout-form" > -->
        <div class="form-group1">
          <input
            class="form-input"
            type="text"
            name="first-name"
            id="first-name"
            v-model="firstName"
            placeholder="First Name"
          />
          <input
            class="form-input"
            type="text"
            name="last-name"
            id="last-name"
            v-model="lastName"
            placeholder="Last Name"
          />
        </div>
        <!-- <div class="form-group">
            <input
              class="form-input"
              type="text"
              name="address"
              id="address"
              v-model="address"
              placeholder="Address"
            />
          </div> -->
        <!-- <div class="form-group">
            <input
              type="text"
              name="apartment"
              id="apartment"
              class="form-input"
              v-model="apartment"
              placeholder="Apartment Number, Landmark"
            />
          </div>
          <div class="form-group">
            <input
              class="form-input"
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              v-model="phoneNumber"
              placeholder="Phone Number"
            />
          </div> -->
        <!-- <div class="form-group">
            <input
              class="form-input"
              type="text"
              name="name"
              id="name"
              v-model="authStore.activeUser.name"
              placeholder="First Name"
            />
          </div> -->

        <div class="form-group">
          <input
            class="form-input"
            type="text"
            name="email"
            id="email"
            v-model="email"
            placeholder="Enter Your Email"
          />
        </div>

        <div class="form-group">
          <input class="form-input" name="amount" :value="'GHS' + finalTotal.toFixed(2)" readonly />
        </div>

        <h2>Delivery Method</h2>
        <div>
          <div class="delivery">
            <label class="checkbox-txt">
              <img class="van-shop" src="/icons/van.png" />Home Or Office Delivery
              <input type="radio" name="radio" :value="delivery" v-model="homeOrOfficeDelivery" />

              <span class="checkbox-container"></span>
            </label>
          </div>

          <div class="delivery">
            <label class="checkbox-txt"
              ><img class="van-shop" src="/icons/shop.png" />Pick Up
              <input type="radio" name="radio" :value="pickUp" v-model="pickUpAtRestaurant" />
              <span class="checkbox-container"></span>
            </label>
          </div>
        </div>

        <!-- <div>
            <h2>Choose Payment Method</h2> -->

        <!-- <div class="payment">
              <button class="pay-type" id="cash">
                <span btn-txt>Cash </span>
                <span><img src="/icons/cash.png" alt="" class="btn-icon" /></span>
              </button>
              <button class="pay-type">
                <span>Card</span>
                <span><img src="/icons/card.png" alt="" class="btn-icon" /></span>
              </button>
              <button class="pay-type">
                <span>Mobile Money</span>
                <span><img src="/icons/momo.png" class="btn-icon" /></span>
              </button>
            </div>
          </div> -->
        <div class="payment">
          <paystack
            class="pay-type"
            buttonText="Pay Online"
            :publicKey="publicKey"
            :firstName="firstName"
            :lastName="lastName"
            :email="email"
            :amount="amountVal"
            currency="GHS"
            :reference="reference"
            :onSuccess="onSuccessfulPayment"
            :callback="callback"
            :onCancel="onCancelledPayment"
          ></paystack>
        </div>
        <!-- </form> -->
      </div>

      <div class="checkout-summary">
        <h2>Order Summary</h2>
        <div class="checkout-items-in-cart" v-for="item in store.getCartItems" :key="item.id">
          <div class="items"><img class="item-image" :src="item.image" alt="" /></div>

          <div class="items-name">{{ item.name }}</div>

          <div class="items-qty">Qty:{{ item.quantity }}</div>

          <div class="items-price">GH&#8373;{{ item.price }}.00</div>
        </div>

        <div class="total-sec">
          <div>
            <p class="subtotal1">Items</p>
            <p class="subtotal">Subtotal:</p>

            <p class="subtotal">Delivery Fee:</p>

            <p class="subtotal">Estimated Tax:</p>

            <p class="subtotal">Total:</p>
          </div>
          <div class="amount-sec">
            <p class="subtotal1">Amount(GH&#8373;)</p>
            <p class="money">
              {{
                store.cartItems
                  .reduce((acc, item) => (acc += item.price * item.quantity), 0)
                  .toFixed(2)
              }}
            </p>

            <p class="money">0.00</p>

            <p class="money">{{ tax.toFixed(2) }}</p>

            <p class="money">
              {{ finalTotal.toFixed(2) }}
            </p>
            <!-- {{ Number(amount) }} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>

<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import paystack from 'vue3-paystack'
import { productsStore } from '@/stores/counter'
import { ref, onMounted, computed, watchEffect } from 'vue'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase/init.js'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from '@/stores/AuthStore.js'
import router from '@/router'
// import { useAuthStore } from '@/stores/AuthStore.js'
const authStore = useAuthStore()
const store = productsStore()
const toast = useToast()
// const authStore = useAuthStore()
const firstName = ref('')
const lastName = ref('')
const deliveryOptions = ref('')
// const address = ref('')
// const apartment = ref('')
// const phoneNumber = ref('')
const orderID = ref(Math.random().toString(36).substr(2, 8))
const delivery = ref('Home or Office Delivery')
const pickUp = ref('Pick Up At The Restaurant ')
const homeOrOfficeDelivery = ref(false)
const pickUpAtRestaurant = ref(false)
const orders = ref({})
const email = ref(authStore.activeUser.email)
const amount = ref(Number(store.totalAmount()))
const publicKey = ref('pk_test_0a38304227dc2e3fdf19cf1eafc60a5938c7a97e')
console.log('Total Amount: ', amount.value, email.value)

const tax = ref((2 / 100) * amount.value)
const finalTotal = ref(amount.value + tax.value)
const amountVal = ref((finalTotal.value * 100).toFixed(2))
let userId
console.log(tax)
onMounted(() => {
  console.log('Mounted')

  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId = user.uid
      console.log(userId)
    }
  })
})

// const paystack = async () => {
//   const res = await fetch(
//     `https://a66a3892-6413-4c26-b76d-5f555f0ea506-00-1kwb47eg1n3im.worf.replit.dev/paystack?email=${email.value}&amount=${amountVal.value}&firstName=${firstName.value}&lastName=${lastName.value}`
//   )
//   const json = await res.json()

//   console.log(json)

//   console.log(json.data.authorization_url)
//   if (json) {
//     window.location.href = json.data.authorization_url
//   }
// }

const reference = computed(() => {
  let text = ''
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 15; i++)
    text += characters.charAt(Math.floor(Math.random() * characters.length))

  return text
})

const getDeliveryType = () => {
  if (pickUpAtRestaurant.value) {
    deliveryOptions.value = pickUp.value
    console.log(deliveryOptions.value)
  } else if (homeOrOfficeDelivery.value) {
    deliveryOptions.value = delivery.value
    console.log(deliveryOptions.value)
  }
}

watchEffect(getDeliveryType)

// watchEffect(() =>{
//   if(pickUpAtRestaurant.value){
//     deliveryOptions.value = pickUp.value
//   console.log(pickUp.value)
//     console.log(deliveryOptions.value)
//   }
// })
// watchEffect(() =>{
//   if(homeOrOfficeDelivery.value){
//     deliveryOptions.value = delivery.value
//   console.log(delivery.value)
//     console.log(deliveryOptions.value)
//   }
// })

const onSuccessfulPayment = async (response) => {
  const responseDetail = response
  const responseReference = responseDetail.reference
  toast.success('Payment Completed Successfully')

  console.log(responseDetail)
  console.log(responseReference)

  const orderRef = doc(db, 'orders', userId)
  const orderData = {
    name: `${firstName.value} ${lastName.value}`,
    email: email.value,
    amount: `GHS ${amountVal.value / 100}`,
    message: responseDetail.message,
    status: responseDetail.status,
    deliveryMethod: deliveryOptions.value,
    transactionNumber: responseDetail.transaction,
    items: store.getCartItems.map((item) => ({
      name: item.name,
      amount: item.price,
      quantity: item.quantity,
      image: item.image,
      productID: item.id
    })),
    date: new Date().toLocaleDateString(), // Add date field
    time: new Date().toLocaleTimeString() // Add time field
  }

  // Add the reservation to the reservations object
  if (!orders.value[userId]) {
    orders.value[userId] = []
  }
  orders.value[userId].push(orderData)

  // Log the reservations
  console.log('Orders:', orders.value)

  try {
    const docSnap = await getDoc(orderRef)
    if (docSnap.exists && docSnap.data()) {
      const existingOrders = docSnap.data().orders
      if (existingOrders) {
        // Update the existing document
        await updateDoc(orderRef, {
          orders: {
            ...existingOrders,
            [orderID.value]: orderData
          }
        })
      } else {
        // Create a new document
        await setDoc(orderRef, {
          orders: {
            [orderID.value]: orderData
          }
        })
      }
    } else {
      // Create a new document
      await setDoc(orderRef, {
        orders: {
          [orderID.value]: orderData
        }
      })
    }
  } catch (error) {
    console.error(error)
    alert(error)
  }

  console.log('Order saved to Firestore')

  setTimeout(() => {
    alert('Order saved to Firestore')
    window.location.replace('/menu')
    router.push('/menu')
    // window.location.href = "/menu"
  }, 3000)
  // router.push("/menu",  () => {}, undefined, true)
}

// const callback = () => {
//   console.log('re-routed to menu page')
//   const onSuccessfulPayment = true
//   if (onSuccessfulPayment) {
//     router.push('/menu')
//   }
// }

const onCancelledPayment = () => {
  console.log('Payment cancelled by user')
}

const taxPercent = () => {
  if (amount.value >= 1000) {
    tax.value = 20
    return tax.value
  } else if (amount.value >= 200) {
    tax.value = (5 / 100) * amount.value
    return tax.value
  } else {
    tax.value = (2 / 100) * amount.value
    return tax.value
  }
}
taxPercent()
console.log(tax)
</script>

<style scoped>
.checkout-box {
  border: 1px solid black;
  width: 60rem;
  height: auto;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 auto;
  margin-top: 30px;
}

.checkout-title {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 2.5rem;
  font-weight: 700;
}

.checkout-container {
  display: flex;
  gap: 30px;
}

.checkout-payment {
  width: 50%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-left: 1.5rem;
}

#delivery-info {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

h2 {
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.checkout-form {
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: auto;
  margin-bottom: 1rem;
  margin-left: 10px;
}

.form-group1 {
  display: flex;
  width: 50%;
  margin-bottom: 1rem;
  margin-left: 10px;
  gap: 2rem;
}

.form-input {
  height: 2.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  margin-top: 1rem;
  margin-left: 10px;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
}

.checkbox-txt {
  display: block;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checkbox-txt input[type='radio'] {
  visibility: hidden;
}

.checkbox-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 1px solid grey;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.checkbox-txt input:checked ~ .checkbox-container {
  background-color: rgb(245, 71, 72);
}

.checkbox-txt:hover input ~ .checkbox-container {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

/* Checkmark */
.checkbox-container:after {
  content: '';
  position: absolute;
  display: none;
}

/* Display checkmark when checked */
.checkbox-txt input:checked ~ .checkbox-container::after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-txt .checkbox-container:after {
  top: 5px;
  left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.van-shop {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 2px;
}

.delivery {
  height: 2rem;
  width: 90%;
  gap: 0.5rem;
  margin-bottom: 10px;
  margin-left: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.payment {
  display: flex;
  justify-content: space-between;
  height: 10rem;
  width: 90%;
  border: 1px solid black;
  margin-left: 20px;
}

.pay-type {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 80%;
  border: 1px solid grey;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.pay-type:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.btn-icon {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

/* Order Summary*/
.checkout-summary {
  width: 40%;
  height: fit-content;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.checkout-items-in-cart {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 1.1rem;
  margin-left: 10px;
  margin-right: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background-color: bisque;
  align-items: center;
}

.item-image {
  margin-top: 5px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
}

.items-img {
  width: fit-content;
  font-size: 1rem;
  font-weight: 500;
}

.items-name {
  width: 10rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
}

.items-qty {
  width: fit-content;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
}

.items-price {
  width: fit-content;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  margin-right: 10px;
}

.total-sec {
  background-color: lightgrey;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 2px;
  margin-top: 20px;
}

.subtotal {
  display: flex;
  margin-left: 10px;
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(0, 0, 0);
  margin-top: 0.5rem;
  text-align: end;
}

.subtotal1 {
  display: flex;
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(0, 0, 0);
  margin-top: 1rem;
  text-align: right;
  margin-left: 10px;
  margin-right: 10px;
}

.money {
  text-align: end;
  margin-right: 5px;
  margin-top: 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: rgba(0, 0, 0);
}

.amount-sec {
  display: flex;
  flex-direction: column;
  justify-content: last baseline;
  align-items: right;
}
</style>
