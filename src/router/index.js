import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CartView from '@/views/CartView.vue'
import CatalogView from '@/views/Catalog.vue'
import MenuView from '@/views/MenuView.vue'
import ReservationView from '@/views/ReservationView.vue'
import ContactUsView from '@/views/ContactUs.vue'
import LoginView from '@/views/LoginView.vue'
import LunchView from '@/views/LunchView.vue'
import DinnerView from '@/views/DinnerView.vue'
import DessertView from '@/views/DessertView.vue'
import DrinksView from '@/views/DrinksView.vue'
import SignUpView from '@/views/SignUpView.vue'
import UserDashBoard from '@/views/UserDashBoard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'in-out' }
    },
    {
      path: '/aboutUs',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: ReservationView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/contactUs',
      name: 'contactUs',
      component: ContactUsView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/lunch',
      name: 'lunch',
      component: LunchView
    },
    {
      path: '/dinner',
      name: 'dinner',
      component: DinnerView
    },
    {
      path: '/dessert',
      name: 'dessert',
      component: DessertView
    },
    {
      path: '/drinks',
      name: 'drinks',
      component: DrinksView
    },
    {
      path: '/checkout',
      name: 'checkout',
      meta: {
        requiresAuth: true
      },
      component: () => import('../views/CheckoutView.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../components/PaymentComponent.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: UserDashBoard
    },
    {
      path: '/email-verification',
      name: 'email-verification',
      component: () => import('../views/EmailVerificationPage.vue')
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('../views/ReviewPage.vue')
    }
  ]
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
        setTimeout(resolve, 100)
      },
      reject
    )
  })
}
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
      return
    } else {
      alert(`You don't have access, Please Sign Up or Login`)
      next('/login')
    }
  } else {
    next()
  }
})
export default router

// // wait till we know the auth state
// while (authStore.isAuthorized === null) {
//   // eslint-disable-next-line no-await-in-loop
//   await new Promise((resolve) => setTimeout(resolve, 100))
// }
