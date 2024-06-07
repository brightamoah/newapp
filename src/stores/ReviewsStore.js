import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/AuthStore'
import { collection, getDocs, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase/init.js'
import { useToast } from 'vue-toastification'

// import { productsStore } from '@/stores/counter'

export const useReviewStore = defineStore('reviews', () => {
  // const store = productsStore()
  const authStore = useAuthStore()
  const reviews = ref({})
  const rating = ref(1)
  const comment = ref('')
  const itemID = ref('')
  let showModal = ref(false)
  const reviewsCount = ref({})
  const selectedItem = ref('')
  const averageRating = ref(0)
  const averageRatings = ref({})
  const oldReviews = []
  const toast = useToast()

  const closeModal = () => {
    showModal.value = false
    toast.success('Review submitted successfully')
    console.log('clicked', showModal.value)
  }

  onMounted(async () => {
    try {
      const querySnapshotOrders = await getDocs(collection(db, 'reviews'))
      const reviewsArray = [] // Create an empty array
      const averageRatingsArray = []
      querySnapshotOrders.forEach((doc) => {
        const data = doc.data()
        const productId = parseInt(doc.id, 10)
        averageRatingsArray.push(data.averageRating)
        averageRatings.value[productId] = data.averageRating.toFixed(1) || 0.0
        reviewsCount.value[productId] = (data.reviews || []).length // Set the review count
        reviewsArray.push(data) // Push each document's reviews into the array
        reviews.value[productId] = data.reviews || []
      })
      oldReviews.value = reviewsArray
      // averageRatings.value = averageRatingsArray
      console.log('Old Reviews:', oldReviews.value)
      console.log('Average Ratings', averageRatings.value)

      calculateAllAverageRatingsAndUpdateFirestore()
    } catch (error) {
      console.error('Error fetching reviews from Firestore:', error)
    }
  })

  function calculateAverageRating(productId) {
    const productReviews = reviews.value[productId] || []
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0)
    const avgRating = productReviews.length
      ? Math.round((sum / productReviews.length).toFixed(1) * 100) / 100
      : 0
    return avgRating
  }

  async function calculateAllAverageRatingsAndUpdateFirestore() {
    for (const productId in reviews.value) {
      if (Object.prototype.hasOwnProperty.call(reviews.value, productId)) {
        const avgRating = calculateAverageRating(productId)
        const reviewsRef = doc(db, 'reviews', productId)
        try {
          await updateDoc(reviewsRef, {
            averageRating: avgRating
          })
          console.log(`Updated Firestore for product ${productId} with average rating ${avgRating}`)
        } catch (error) {
          console.error(`Error updating Firestore for product ${productId}:`, error)
        }
      }
    }
  }

  const reviewItem = (item) => {
    showModal.value = true
    selectedItem.value = item
    rating.value = 1 // Set the initial rating value to 0
    comment.value = '' // Set the initial comment value to an empty string
    itemID.value = selectedItem.value.productID.toString()

    console.log('clicked', showModal.value)
    console.log('Item selected:', selectedItem.value)
    console.log('ProductID:', itemID, typeof itemID.value)
  }

  const submitReview = async () => {
    const review = {
      productID: selectedItem.value.productID,
      username: authStore.activeUser.displayName,
      rating: rating.value,
      comment: comment.value,
      image: selectedItem.value.image
    }
    console.log('submitted', review)

    // Add the reservation to the reservations object
    if (!reviews.value[itemID.value]) {
      reviews.value[itemID.value] = []
    }
    reviews.value[itemID.value].push(review)
    const newAverageRating = calculateAverageRating(itemID.value)

    // Log the reservations
    console.log('Reviews:', reviews.value)

    const reviewsRef = doc(db, 'reviews', itemID.value)

    try {
      const docSnap = await getDoc(reviewsRef)
      if (docSnap.exists && docSnap.data()) {
        const existingReviews = docSnap.data().reviews
        if (existingReviews) {
          // Update the existing document
          await updateDoc(reviewsRef, {
            reviews: [...existingReviews, review],
            averageRating: newAverageRating
          })
          console.log('updated to firestore')
        } else {
          // Create a new document
          await setDoc(reviewsRef, {
            reviews: [review],
            averageRating: newAverageRating
          })
          console.log('submiitted to firestore')
        }
      } else {
        // Create a new document
        await setDoc(reviewsRef, {
          reviews: [review],
          averageRating: newAverageRating
        })
        console.log('submiitted to firestore')
      }
    } catch (error) {
      console.error(error)
    }

    closeModal()
  }

  // function addReview() {
  //   const reviewsCol = collection(db, 'reviews')
  //   addDoc(reviewsCol, {
  //     productId: store.products.id,
  //     username: newReview.value.username,
  //     rating: newReview.value.rating,
  //     review: newReview.value.review
  //   })
  //   reviews.value.push({ ...newReview.value, id: store.cartItems.id })
  //   calculateAverageRating()
  //   newReview.value = {
  //     username: '',
  //     rating: 0,
  //     review: ''
  //   }
  // }

  return {
    reviews,
    calculateAverageRating,
    // addReview,
    rating,
    comment,
    itemID,
    reviewItem,
    submitReview,
    // review,
    reviewsCount,
    averageRating,
    showModal,
    closeModal,
    selectedItem,
    oldReviews,
    averageRatings,
    calculateAllAverageRatingsAndUpdateFirestore
  }
})
