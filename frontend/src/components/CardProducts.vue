<template>
  <div class="products-container">
    <div class="products-card" @click="handleClick">
      <a href="">
      <img :src="product.img" alt="" class="default-img">
      <div class="text-container">
        <div class="name">{{product.name}}</div>
        <div class="inside-cont">
          <div class="text">{{product.price}}.00$</div>

         
        </div>
      </div>
    </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  
  methods: {
    handleClick() {
      this.$emit('product-click', this.product.productid);
    }
  }
}
</script>

<style>

    .products-container {
        display: flex;
        flex-direction: row;
        background: black;
    }

    .products-card {
        width: 340px;
        height: 240px;
        background: white;
        border-radius: 10px;
        position: relative;
        transition: transform 0.3s;
        margin-bottom: 25px;
    }

    .products-card:hover {
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
        visibility: none; opacity: 0;
        transition: opacity 0.3s;
        height: 60px;
    }

    .products-card:hover .text-container{
      visibility: visible; opacity: 1;
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
      cursor:pointer;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
    }

    .buy-button:hover{  
      background-color:black ;
      color:white
    }
</style>