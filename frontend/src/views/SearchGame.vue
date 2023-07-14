<template>
    <div class="products-containerr" @product-click="handleProductClick">
        <Navbar />
        <div v-if="gameByName.length === 0">
            <h1 class="empty-msg">To view a product, you must first search for it.</h1>
        </div>

        <div v-if="!gameByName">
            <h1 class="empty-msg">Could not find any game with that name.</h1>
        </div>
        
        <div class="products-cards" v-for="(game, index) in gameByName" :key="index" @click="handleProductClick(game.productid)">
            <a href="">
                <img :src="gameByName[index].img" alt="" class="default-img">
                <div class="text-container">
                    <div class="name">{{ gameByName[index].name }}</div>
                    <div class="inside-cont">
                        <div class="text">{{ gameByName[index].price }}.00$</div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'SearchGame',
    components: {
        Navbar
    },

    setup() {
        const store = useStore();
        const gameByName = computed(() => store.state.productByName);

        return {
            gameByName,
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
.products-containerr {
    margin-top: 140px;
    display: flex;
    flex-direction: row;
    background: black;
    justify-content: flex-start;
    margin-left: 30px;
}

.products-cards {
    width: 340px;
    height: 240px;
    background: white;
    border-radius: 10px;
    position: relative;
    transition: transform 0.3s;
    margin-bottom: 25px;
    margin-right: 30px;
}

.products-cards:hover {
    transform: scale(1.1);
}

.default-img {
    width: 340px;
    height: 240px;
    border-radius: 8px;
}

.text-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    visibility: none;
    opacity: 0;
    transition: opacity 0.3s;
    height: 60px;
}

.products-cards:hover .text-container {
    visibility: visible;
    opacity: 1;
}

.text {
    color: white;
    font-weight: bolder
}

.name {
    color: white;
}

.inside-cont {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    align-content: center;
}


.buy-button {
    border-radius: 30px;
    border: none;
    background-color: white;
    color: black;
    cursor: pointer;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
}

.buy-button:hover {
    background-color: black;
    color: white
}

.empty-msg {
    color: white;
}
</style>