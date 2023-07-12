<template>
    <div class="searched-game-cont">
        <Navbar />
        <div v-if="product">
            <h1 style="color: white">{{ product.name }}</h1>
        </div>
        <div v-else>
            <h2 class="error-msg">No se encontró ningún producto con el nombre especificado</h2>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'SearchGame',
    components: {
        Navbar
    },

    setup() {
        const store = useStore();
        const route = useRoute();
        const productName = route.query.name;
        
        const product = computed(() => {
            const productsStore = store.state.products;
            const foundProduct = productsStore.find(p => p.name == productName);

            return foundProduct
        });

        return {
            product
        }

    }
}
</script>

<style>
.search-game {
    color: white;
}

.error-msg {
    color: white;
    margin-top: 150px;
}
</style>