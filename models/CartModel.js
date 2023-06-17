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

