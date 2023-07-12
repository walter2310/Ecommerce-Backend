import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cart: []
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },

    setCart(state, payload) { 
      state.cart = payload;
    }
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const products = await axios.get('http://localhost:5050/products/');
        commit('setProducts', products.data.data);
        
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
    getProductById: (state) => (id) => {
      return state.products.data.find(product => product.productid === id);
    }
  }
});
