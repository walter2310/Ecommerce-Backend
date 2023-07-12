<template>
    <div>
        <Navbar />
        <div class="main-cont">
            <div class="rectangle">
                <img src="../assets/New_Offers.png" alt="" class="offers">
            </div>
        </div>

        <div class="products-list">
            <h1 class="title">Bestseller</h1>
            <div class="products-container">
                <CardProducts v-for="product of products.slice(0, 4)" :key="product.productid" :product="product"
                    @product-click="handleProductClick" />
            </div>
        </div>


        <div class="footer">
            <div class="explore-box">
                <h3>Discover the variety of games we have for you</h3>
                <button class="explore-btn"><a href="/explore">Explore</a></button>
            </div>
        </div>

    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import CardProducts from '@/components/CardProducts.vue';
import Navbar from '../components/Navbar.vue';

export default {
    name: "Home",
    components: {
        CardProducts,
        Navbar
    },

    setup() {
        const store = useStore();
        const products = computed(() => store.state.products);

        return {
            products,
        }
    },

    methods: {
        handleProductClick(productid) {
            this.$router.push({
                name: 'product-details',
                params: { id: productid }
            })
        },
    },

}
</script>

<style>
.main-cont {
    margin-top: 150px;
    margin-left: 210px;
}

.rectangle {
    height: 350px;
    width: 1080px;
    background: white;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    color: white;
}

.products-list {
    margin-top: 70px;
    margin-left: 10px;
}

.products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.offers {
    width: 100%;
    border-radius: 15px;
}

.footer {
    color: white;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 50px;
}

.explore-box {
    display: flex;   
}

.explore-btn {
    
    color: white;
    background: none;
    border: none;
    outline: none;
    text-decoration: underline;
    cursor:pointer;
    font-size: medium;
}

</style>
