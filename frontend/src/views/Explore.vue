<template>
    <div class="explore-cont">
        <Navbar />
        <div class="products-list">
            <h1 class="title">Our Catalog</h1>
            <div class="products-container" @click="handleClick">
                <CardProducts v-for="product of products" :key="product.productid" :product="product"
                    @product-click="handleProductClick" />
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import CardProducts from '@/components/CardProducts.vue';
import { computed, onMounted } from 'vue';
import Navbar from '../components/Navbar.vue';

export default {
    name: "Home",
    components: {
        CardProducts,
        Navbar
    },

    setup() {
        const store = useStore();
        onMounted(() => {
            store.dispatch('fetchData');
        });

        const products = computed(() => store.state.products);
        return {
            products
        }
    },

    methods: {
        handleClick() {
            this.$emit('product-click', this.product.productid);
        }
    }
}
</script>

<style>
.explore-cont {
    margin-top: 150px;
}

.products-list {
    margin-top: 70px;
    margin-left: 50px;
}

.products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>