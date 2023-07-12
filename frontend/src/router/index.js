import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Explore from '../views/Explore.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import SearchGame from '../views/SearchGame.vue'
import Cart from '../views/Cart.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/explore',
    name: 'explore',
    component: Explore
  },

  {
    path: '/product-details/:id',
    name: 'product-details',
    component: ProductDetails 
  },

  {
    path: '/register',
    name: 'register',
    component: Register 
  },

  {
    path: '/login',
    name: 'login',
    component: Login 
  },

  {
    path: '/search-game',
    name: 'search-game',
    component: SearchGame 
  },

  {
    path: '/cart',
    name: 'cart',
    component: Cart 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
