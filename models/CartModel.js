const { client } = require('../DB/databasepg');

class Cart {
    items = [];
    totalPrice = 0;
    
    constructor(items, totalPrice){
        this.items = items;
        this.totalPrice = totalPrice;
    }

    addItem(item){
        this.items.push(item);
    };

    showCart(){
        for(let i = 0; i < this.items.length; i++) {
            console.log(this.items[i]);
        }
    };

    removeProduct(itemName){
        for (let i = 0; i < this.items.length; i++) {
            if (this.items.name === itemName) {
              this.items.splice(i, 1);
            }
        }
    };

    getTotalPrice(){
        let finalPrice = 0;
        for(let i = 0; i < this.items.length; i++){
            finalPrice += this.items[i].price;
        }
        return finalPrice;
    };
}

const cart = new Cart([]);

cart.addItem({name: 'The last of us', price: 20})
cart.addItem({name: 'God of war', price: 25})
cart.addItem({name: 'Uncharted', price: 10})

cart.showCart()

cart.removeProduct('The last of us');
cart.showCart()