<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Home from "../src/views/Home"
import Navbar from "../src/components/Navbar"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueBasicAlert from 'vue-basic-alert'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

library.add(faShoppingCart)

export default {
  name: "App",
  components: {
    Home,
    Navbar,
    FontAwesomeIcon,
    VueBasicAlert
  },

  setup() {
    const store = useStore();
    
    onMounted(async () => {
      await store.dispatch('fetchData');
    })
  }
}

</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&family=Work+Sans:wght@300&display=swap');

body {
  font-family: 'Nunito', 'sans';
  background: black;
}
</style>
