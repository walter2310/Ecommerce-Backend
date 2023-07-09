import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: []
  },

  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    }
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const res = await axios.get('http://localhost:5050/products/');
        commit('setProducts', res.data.data);
        
      } catch (error) {
        console.log(error)
      }
    }
  },

  getters: {
    getProductById: (state) => (id) => {
      return state.products.data.find(product => product.productid === id);
    }
  }
});
