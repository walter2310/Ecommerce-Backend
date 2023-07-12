<template>
    <div class="main-cont-cart">
        <div class="left-column">
            <div class="games-cart" v-for="(game, index) in game" :key="index">
                <div class="img-cart">
                    <div class="inside-data">
                        <img :src="game.img" alt="" class="img-in-cart">
                        <h1 class="game-namee">{{ game.name }}</h1>
                    </div>
                    <h4 class="game-price">${{ game.price }}.00</h4>
                </div>

                <p class="age-restringed">Only for players older than: +{{ game.age }}</p>
                <button class="remove-btn">Remove</button>
            </div>
        </div>
        <div class="right-column">
            <div class="summary-box">
                <h1 class="game-summary-tile">Games Summary</h1>
                <h3 class="sumamry-price">Price:  ${{totalPrice}}</h3>
                <h3 class="sumamry-price">Taxes: 16%</h3>
                <h3 class="sumamry-price">Subtotal:  ${{totalPriceWithTax}}</h3>
                <button class="check-out-btn">Check Out</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['game'],
    computed: {
        totalPrice() {
            return this.game.reduce((total, game) => total + game.price, 0);
        },
        
        totalPriceWithTax() {
            return (this.totalPrice * 1.16).toFixed(2);
        }
    }
}
</script>

<style>
.main-cont-cart {
    display: flex;
}

.left-column {
    flex: 1;
}

.right-column {
    flex: 0 0 280px;
    margin-left: 40px;
}

.games-cart {
    background-color: #1E1E1E;
    width: 700px;
    height: 220px;
    margin-left: 100px;
    border-radius: 10px;
    margin-bottom: 40px;
}

.game-namee {
    color: white;
    margin-left: 20px;
}

.game-price {
    color: white;
    margin-top: 15px;
    margin-right: 20px;
}

.img-in-cart {
    width: 35%;
    margin-left: 20px;
    border-radius: 5px;
}

.img-cart {
    display: flex;
    margin-top: 5px;
}

.inside-data {
    margin-top: 20px;
    display: flex;
}

.age-restringed {
    color: white;
    margin-left: 265px;
    margin-top: -40px;
}

.remove-btn {
    margin-top: 50px;
    margin-left: 620px;
    color: white;
    background: none;
    border: none;
    outline: none;
    text-decoration: underline;
    cursor:pointer
}

.summary-box {
    width: 280px;
    height: 278px;
    background-color:#1E1E1E ;
    color:white ;
    border-radius :10px ;
    margin-right: 120px;
    margin-top: -20px;
}

.game-summary-tile {
   display:flex ;
   align-content:center ;
   justify-content:center;
   
}

.sumamry-price{
   margin-left :20px ;
}

.check-out-btn{
   background-color:#662D91 ;
   color:white ;
   width :100% ;
   margin-top :20px ;
   height :60px ;
   border-radius :10px ;
   font-size :large ;
   cursor:pointer
}
</style>
