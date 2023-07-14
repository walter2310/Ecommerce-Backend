import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cart: [],
    productByName: []
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },

    setProductByName(state, payload) {
      state.productByName = payload;
    },

    setCart(state, payload) { 
      state.cart = payload;
    }
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const products = await axios.get('http://localhost:5050/products/');
        const sortedProducts = products.data.data.sort((a, b) => a.productid - b.productid);
        
        commit('setProducts', sortedProducts);
        
      } catch (error) {
        console.log(error)
      }
    },

    async getCartData({ commit }) {
      try {
        const userId = localStorage.getItem("userId");
        const productsInCart =  await axios.get(`http://localhost:5050/cart/${userId}`); 

        commit('setCart', productsInCart.data);

      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
     
  }
});
