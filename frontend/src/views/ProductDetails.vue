<template>
    <div class="product-details-cont">
        <Navbar />
        <div class="main-cont-products">
            <div class="game-details" v-if="product">
                <img :src="product.img" alt="" class="product-img-details">
                <div class="game-info">
                    <h1 class="game-title">{{ product.name }}</h1>
                    <p>{{ product.description }}</p>
                    <p>+{{ product.age }}</p>
                    <h4>Developers: {{ product.developer }}</h4>
                    <h4>Category: {{ product.category }}</h4>

                    <div class="buttons">
                        <button class="buy-btn">Buy</button>
                        <button @click="addTocart()" class="add-to-cart"><a class="fa fa-shopping-cart"></a></button>
                        <p class="add-btn">Add to cart</p>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '../components/Navbar.vue';

let productId;

export default {
    name: "ProductDetails",
    components: {
        Navbar
    },
    beforeRouteEnter(to, from, next) {
        // Accede al store
        const store = useStore();

        // Verifica si los productos ya están cargados
        if (store.state.products.length === 0) {
            // Si no están cargados, llama a la acción fetchData para cargarlos
            store.dispatch('fetchData').then(() => {
                // Una vez que se hayan cargado los productos, continúa con la navegación
                next();
            });

        } else {
            next();
        }
    },
    
    setup() {
        const store = useStore();
        const route = useRoute();
        
        productId = route.params.id;
        
        const product = computed(() => {
            const productsStore = store.state.products;
            const foundProduct = productsStore.find(p => p.productid == productId);

            return foundProduct
        });

        return {
            product
        }
    },
    
    methods: {
        async addTocart() {
            const userId = localStorage.getItem("userId");

            try {
                await this.axios.post(`http://localhost:5050/cart/${productId}/${userId}`)
                    .then(response => {
                        this.$router.push({ path: "/cart" });
                        this.$toast.success(`Game added`);
                    })

            } catch (error) {
                this.$toast.warning(`Please log in to add a product`);
            }
        }
    }
}
</script>

<style>
.main-cont-products {
    width: 1500px;
    height: 700px;
    margin-top: 180px;
}

.product-img-details {
    max-width: 40%;
    margin-left: 130px;
    border-radius: 10px;
}

.game-info {
    color: white;
    width: 480px;
    height: 30px;
    float: right;
    margin-right: 230px;
    margin-top: -20px;
}

.game-title {
    font-size: 40px;
}

.buy-btn {
    border-radius: 30px;
    border: none;
    background-color: white;
    color: black;
    cursor: pointer;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 20px;
}

.buy-btn:hover {
    background-color: black;
    color: white
}

.add-to-cart {
    border-radius: 30px;
    border: none;
    background-color: white;
    color: black;
    cursor: pointer;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    font-size: 15px;
    margin-top: 10px;
}

.add-to-cart:hover {
    background-color: black;
    color: white
}

.buttons {
    width: 350px;
    margin-left: -44px;
    display: flex;
    justify-content: space-evenly;
}


</style>