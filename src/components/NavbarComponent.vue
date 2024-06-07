<template>
  <div class="main">
    <div class="header">
      <section>
        <RouterLink to="/"><img class="logo-img" src="/images/Logo_no BG red.jpg" /></RouterLink>
      </section>

      <section v-if="!authStore.isLoggedIn">
        <div class="navbar">
          <RouterLink to="/" class="nav-txt">Home
            <!-- <p > Home</p> -->
          </RouterLink>
          <!-- <RouterLink to="/menu" class="nav-txt"> Menu </RouterLink>

          <RouterLink to="/reservation" class="nav-txt">Reservation</RouterLink>
          <RouterLink to="/aboutUs" class="nav-txt">About us</RouterLink>
          <RouterLink to="/contactUs" class="nav-txt">Contact Us</RouterLink> -->
        </div>
      </section>

      <section v-else>
        <div class="navbar">
          <RouterLink to="/" class="nav-txt">Home
            <!-- <p > Home</p> -->
          </RouterLink>
          <RouterLink to="/menu" class="nav-txt"> Menu </RouterLink>

          <RouterLink to="/reservation" class="nav-txt">Reservation</RouterLink>
          <RouterLink to="/aboutUs" class="nav-txt">About us</RouterLink>
          <RouterLink to="/contactUs" class="nav-txt">Contact Us</RouterLink>
        </div>

        <div class="hamburger-menu" :class="{ active: isMenuOpen }">
          <ul>
            <li>
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/menu">Menu</RouterLink>
            </li>
            <li>
              <RouterLink to="/reservation">Reservation</RouterLink>
            </li>
            <li>
              <RouterLink to="/aboutUs">About us</RouterLink>
            </li>
            <li>
              <RouterLink to="/contactUs">Contact Us</RouterLink>
            </li>

            <div>
              <button class="login-btn" id="sign-out" @click="authStore.handleSignOut">Sign Out</button>
            </div>
          </ul>
        </div>


        <button class="hamburger-toggle" @click="toggleMenu">☰</button>


      </section>

      <section class="btn-section">
        <RouterLink to="/cart">
          <el-badge :value="store.countCartItems" color="rgb(245, 71, 72" class="item">
            <button class="btn-cart">
              <img src="/images/icons8-cart-24.png" alt="cart" />
            </button>
          </el-badge>
        </RouterLink>

        <div v-if="!authStore.isLoggedIn">
          <RouterLink to="/signup"><button class="signup-btn">Sign Up</button></RouterLink>
          <router-link to="/login"> <button class="login-btn">Log In</button></router-link>
        </div>
        <spring-spinner :animation-duration="3040" :size="60" color="#ff1d5e" v-else-if="userLoading" />
        <div class="signout-profile" v-else>
          <div>
            <RouterLink to="/dashboard">
              <!-- <span id="profile">
                <img id="profile" src="/icons/profile.png" alt="cart" />
              </span> -->
              <span id="profile">
                <img id="profile" :src="authStore.activeUser.profilePicture" alt="avatar" style="border: 2px solid rgba(0, 0, 0, 0.4);    box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 8px;"/>
              </span>
            </RouterLink>
          </div>

          <div>
            <button class="login-btn" id="signout-profile1" @click="authStore.handleSignOut">Sign Out</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavbarComponent'
}
</script>

<script setup>
import { productsStore } from '@/stores/counter'
import { useAuthStore } from '@/stores/AuthStore.js'
import { SpringSpinner } from 'epic-spinners'
import { ref } from 'vue';

const authStore = useAuthStore()

const store = productsStore()

const isMenuOpen = ref(false)


function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

const color = ref("#"+Math.random().toString(16).slice(-6))
console.log(color.value)
</script>

<style>
.main {
  height: 10vh;
  overflow: hidden;
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  position: fixed;
  z-index: 1;
}

.hamburger-menu {
  display: none;
}

.hamburger-toggle {
  display: none;
  width: 3.5rem;
  height: 2rem;
  font-size: 1.3rem;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.logo-img {
  width: 10rem;
  height: auto;
  margin-left: 2rem;
}

.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  width: auto;
  height: auto;
  font-size: 10rem;
}

.btn-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 15.625rem;
  height: 5rem;
  gap: 0.5rem;
  font-weight: 500;
}

.btn-cart {
  width: 2rem;
  height: 2rem;
  border: 1px;
  border-radius: 50%;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
}

.btn-cart:hover {
  transform: scale(1.03, 1.03) translate3d(0, 0, 0);
}

.login-btn {
  width: 80px;
  height: 30px;
  color: white;
  background-color: rgb(245, 71, 72);
  border-radius: 10px;
  border: none;
  padding: 0px;
  font-size: 0.938rem;
  font-weight: 400;
  line-height: 1.513rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.login-btn:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.signup-btn {
  width: 5rem;
  height: 1.875rem;
  color: black;
  border-radius: 0.625rem;
  border: none;
  font-size: 0.938rem;
  font-weight: 400;
  line-height: 1.513rem;
  padding: 0;
}

.signup-btn:hover {
  transform: scale(1.1, 1.1) translate3d(0, 0, 0);
}

.nav-txt {
  font-weight: 400;
  font-size: 1.5rem;
  color: rgb(48, 30, 8);
}

.nav-txt:hover {
  color: rgb(245, 71, 72);
  background-color: transparent;
  text-decoration: none;
  text-shadow: horizontal-shadow vertical-shadow blur color;
}

.router-link-active.router-link-exact-active {
  color: rgb(245, 71, 72);
  font-size: 1.5;
  font-weight: 700;
}

.signout-profile {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

#profile {
  width: 2.5rem;
  height: 2.5rem;
  margin: 0 auto;
  padding: 0px;
   border-radius: 50%;
}

/* Add this to your styles */
@media only screen and (max-width: 800px) {
  .navbar {
    display: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  .logo-img {
    margin-left: 0;
  }

  .btn-section {
    margin-left: 2rem;
  }

  .hamburger-menu {
    display: block;
  }

  .hamburger-toggle {
    display: block;
    margin-left: 10rem;
  }

  #profile {
    margin-left: 1rem;
  }
  .btn-cart{
    margin-left: 6rem;
  }

  #signout-profile1 {
    display: none;
  }

  .hamburger-menu.active {
    display: block;
  }

}

.hamburger-menu {
  width: 50%;
  display: none;
  position: absolute;
  top: 4rem;
  right: 20%;
  background-color: white;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: #0000003d 0px 3px 8px;
}

.hamburger-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-right: 1rem;
}

.hamburger-menu li {
  margin-bottom: 1rem;

}

.hamburger-menu a {
  color: #333;
  text-decoration: none;
}

.hamburger-menu a:hover {
  color: rgb(245, 71, 72);
}
</style>

// text-shadow : horizontal-shadow vertical-shadow blur color;
