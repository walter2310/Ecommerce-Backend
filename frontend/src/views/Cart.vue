<template>
  <div class="cart-cont">
    <Navbar />
    <div class="cart-hi">
        <h1>My Cart</h1>
    </div>
    <ProductsInCart v-for="game of cart" :key="game.productid" :game="game"/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ProductsInCart from '../components/ProductsInCart.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { onMounted } from 'vue';

export default {
    name: 'Cart',
    components: {
        Navbar,
        ProductsInCart
    },

    setup() {
        const store = useStore();
        onMounted(async () => {
            await store.dispatch('getCartData');
        });

        const cart = computed(() => store.state.cart);

        return {
            cart,
        }
    },
}
</script>

<style>
.cart-hi {
    color: white;
    margin-top: 200px;
    margin-left: 100px;
}
</style>