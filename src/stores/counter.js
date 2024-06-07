import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const toast = useToast()

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const productsStore = defineStore('products', {
  state: () => {
    return {
      toast,
      products: [
        {
          id: 1001,
          name: 'Beef Jollof Rice',
          price: 40,
          image: '/images/Beef_jollof_dinner.jpg',
          description: 'Comes with an Egg, Coleslaw, Special Sauce, and Green Pepper Sauce'
        },
        {
          id: 1002,
          name: 'Chicken Jollof Rice',
          price: 35,
          image: '/images/chicken Jollof_dlunch.jpg',
          description: ' Comes with chicken, coleslaw, special sauce and green pepper sauce.'
        },
        {
          id: 1003,
          name: 'Rice and plantain',
          price: 30,
          image: '/images/Eba and fish _dinner.jpg',
          description:
            'Comes with fried plantain, diced vegetables, special sauce and pepper sauce.'
        },
        {
          id: 1004,
          name: 'Salad Pasta',
          price: 25,
          image: '/images/img_pngitem1447549.png',
          description:
            'Contains dried herbs, garlic, vinegar, olive oil and the secret ingredient: cheese.'
        },
        {
          id: 1005,
          name: 'Assorted Fried Rice',
          price: 40,
          image: '/images/fried rice with assorted protein_dinner.jpg',
          description:
            ' Comes with a minced beef, chicken, sausage, chopped vegetables, and black pepper.'
        },
        {
          id: 1006,
          name: 'Gizzard Fried Rice',
          price: 35,
          image: '/images/gizzard-fried-rice.jpg',
          description:
            '   Comes with Gizzard, Sausage, coleslaw, special sauce and green pepper sauce.'
        },
        {
          id: 1007,
          name: 'Angwamu(Oil Rice)',
          price: 30,
          image: '/images/oil-rice_lunch.jpg',
          description:
            'Comes with a sausage, egg, salad, avocado pear, minced meat and red and black pepper.'
        },
        {
          id: 1008,
          name: 'Loaded Salad',
          price: 25,
          image: '/images/loaded salad_lunch and snack.jpg',
          description:
            ' Comes with a corned beef, egg, salad, avocado pear, baked beans, macaroni, sardine and special sauce'
        },
        {
          id: 1009,
          name: 'Pepperoni Pizza',
          price: 55,
          image: '/images/img_pngitem5290903.png',
          description:
            'Comes with a thin crust topped with tomato sauce, mozzarella cheese, and slices of pepperoni.'
        },
        {
          id: 1010,
          name: 'Sausage Fried Rice',
          price: 35,
          image: '/images/Sausage_fried-rice_lunch.jpg',
          description: 'Comes with Sausage, coleslaw, special sauce and green pepper sauce.'
        },
        {
          id: 1011,
          name: 'Assorted Spaghetti',
          price: 35,
          image: '/images/shrimpand sausage spaghetti_ dinner.jpg',
          description: ' Comes with shrimp, gizzard,sausage and vegetables.'
        },
        {
          id: 1012,
          name: 'Chicken Jollof Rice',
          price: 35,
          image: '/images/shrimpand sausage spaghetti_ dinner.jpg',
          description: ' Comes with chicken, coleslaw, special sauce and green pepper sauce.'
        }
      ],

      drinks: [
        {
          id: 2001,
          name: 'Mohito',
          price: 25,
          image: '/images/Mojito1.jpg',
          description:
            'A refreshing, minty cocktail made with rum, lime juice, and a splash of soda water, perfect for hot summer days.'
        },
        {
          id: 2002,
          name: 'Coca-Cola',
          price: 10,
          image: '/images/coke.jpg',
          description: `A classic, iconic cola-flavored soda that's sweet, refreshing, and instantly recognizable. `
        },
        {
          id: 2003,
          name: 'Chocolate Drink',
          price: 15,
          image: '/images/choco-drink.jpg',
          description: `A sweet, creamy beverage made with high-quality chocolate and milk. `
        },
        {
          id: 2004,
          name: 'Sex On The Beach',
          price: 18,
          image: '/images/SOTB.jpg',
          description: ` A fruity, tropical cocktail made with vodka, peach schnapps, and cranberry juice, perfect for sipping on a beach vacation. `
        },
        {
          id: 2005,
          name: 'Sobolo (Strawberry)',
          price: 10,
          image: '/images/Sobolo_strawberry.jpg',
          description: `Tea-like beverage infused with hibiscus flowers and strawberry for a quick refresh.`
        },
        {
          id: 2006,
          name: 'Margarita',
          price: 20,
          image: '/images/Margarita .jpg',
          description: `A tangy, citrus cocktail made with tequila, lime juice, and triple sec, perfect for sipping on a warm summer evening. `
        },

        {
          id: 2007,
          name: 'Negroni',
          price: 15,
          image: '/images/Negrito.jpg',
          description: `A classic negroni is the original 1:1:1 cocktail (equal parts gin, sweet vermouth, and Campari). `
        },

        {
          id: 2008,
          name: 'Lamugin',
          price: 10,
          image: '/images/lamugin.jpg',
          description: `A nutritious, plant-based beverage made with millet grains and perfect for those looking for a dairy-free alternative. `
        },

        {
          id: 2009,
          name: 'Comicon',
          price: 20,
          image: '/images/comicon.jpg',
          description: ` A vibrant, energetic cocktail inspired by the excitement of comic-con, made with blue curaçao, lemon-lime soda, and grenadine. `
        },

        {
          id: 2010,
          name: 'Cosmopolitan',
          price: 20,
          image: '/images/cosmopolitan .jpg',
          description: `A sophisticated, fruity cocktail made with vodka, cranberry juice, and lime, perfect for sipping on a night out. `
        },

        {
          id: 2011,
          name: 'Strawberry milkshake',
          price: 15,
          image: '/images/StrawberryMS.jpg',
          description: `A creamy, sweet beverage made with fresh strawberries and ice cream, perfect for a hot summer day. `
        },

        {
          id: 2012,
          name: 'Martini',
          price: 10,
          image: '/images/martini.jpg',
          description: `An iconic cocktail of sophistication, blending gin or vodka with vermouth, served chilled and garnished with a twist or an olive.`
        }
      ],
      desserts: [
        {
          id: 3001,
          name: 'Banana Crepes',
          price: 35,
          image: '/images/desserts-crepes.png',
          description:
            'Contains dried herbs, garlic, vinegar, olive oil and the secret ingredient: cheese.'
        },
        {
          id: 3002,
          name: 'Pancakes',
          price: 45,
          image: '/images/pancake.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3003,
          name: 'Chocolate Brownie',
          price: 45,
          image: '/images/brownie-desserts.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3004,
          name: 'Waffles Ice Cream',
          price: 45,
          image: '/images/wafflesicecream.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3005,
          name: 'Ice Cream Cookie',
          price: 45,
          image: '/images/dessert-cookie.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3006,
          name: 'Blueberry Waffles',
          price: 45,
          image: '/images/dessert-waffles-blueberries.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3007,
          name: 'Egg Tart with Chocolate Filling',
          price: 35,
          image: '/images/ET_Choco-filling.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3009,
          name: 'Chocolate Brownie',
          price: 45,
          image: '/images/brownie-desserts.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3010,
          name: 'Chocolate Brownie',
          price: 45,
          image: '/images/brownie-desserts.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3011,
          name: 'Egg Tart',
          price: 45,
          image: '/images/Egg-tart-normal.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3012,
          name: 'Chocolate Brownie',
          price: 45,
          image: '/images/brownie-desserts.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3013,
          name: 'Samosa',
          price: 45,
          image: '/images/samosa.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3008,
          name: 'Cream Filled Tart',
          price: 45,
          image: '/images/ET_cream-filling.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3014,
          name: 'Fruit Salad',
          price: 30,
          image: '/images/fruit_salad.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3015,
          name: 'Panna Cotta with Berry Caviar',
          price: 45,
          image: '/images/berry-caviar.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        },
        {
          id: 3016,
          name: 'Spring Rolls',
          price: 35,
          image: '/images/Springrolls.jpg',
          description: 'A classic breakfast treat made with whole milk and butter.'
        }
      ],

      cartItems: []
    }
  },
  getters: {
    countCartItems() {
      return this.cartItems.length
    },
    getCartItems() {
      return this.cartItems
    },
    allMenuItems: (state) => {
      const allItems = [...state.products, ...state.drinks, ...state.desserts]
      return shuffleArray(allItems)
    }
  },

  actions: {
    // fetchDrinksFromDB() {
    //   fetch('https://the-cocktail-db.p.rapidapi.com/search.php')
    //     .then(res => res.json()
    //       .then(json => {
    //         this.drinks = json.drinks;
    //       })
    //     )
    // },
    // addDrinkToCart(drink) {
    //   this.cartItems.push(drink)
    // },

    addToCart(item) {
      let index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id)

      if (index !== -1) {
        this.cartItems[index].quantity += 1
        toast.success('Item Added to cart')
      } else {
        item.quantity = 1
        this.cartItems.push(item)
        toast.success('Item Added to cart')
      }
    },

    incrementQuantity(item) {
      let index = this.cartItems.findIndex((product) => product.id === item.id)
      if (index !== -1) {
        this.cartItems[index].quantity += 1
      }
    },

    decrementQuantity(item) {
      let index = this.cartItems.findIndex((product) => product.id === item.id)
      if (index !== -1) {
        this.cartItems[index].quantity -= 1
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter((product) => product.id !== item.id)
        }
      }
    },

    removeFromCart(item) {
      // this.cartItems = this.cartItems.filter((product) => product.id !== item.id);
      let index = this.cartItems.findIndex((product) => product.id === item.id)
      if (index !== -1) {
        console.log(`Removing item: ${item.name} with index ${index}`)
        this.cartItems.splice(index, 1)
        // this.cartItems = this.cartItems.filter((product) => product.id !== item.id)

        toast.error('Item Removed From Cart')
      }
      console.log(this.cartItems)
    },

    totalAmount() {
      let totalToPay = this.cartItems.reduce(
        (total, item) => (total += item.price * item.quantity),
        0
      )
      console.log(totalToPay)
      return totalToPay
    }
  }
})
