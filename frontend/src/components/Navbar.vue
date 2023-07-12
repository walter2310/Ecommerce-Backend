<template>
  <div class="nav-container">
    <nav class>
      <img src="../assets/ecommerce-logo.png" alt="Logo" class="navbar-logo" />
      <ul class="navigation">


        <li v-if="!isLoggedIn"><a href="/login">Login</a></li>
        <li v-if="!isLoggedIn"><a href="/register">Register</a></li>
        <li v-if="isLoggedIn"><a href="#" @click="logOut()">Logout</a></li>
        <li><a href="/cart" class="fa fa-shopping-cart"></a></li>

        <li>
          <form action="/search-game">
            <input type="text" placeholder="Search Store..." name="name" />
            <button class="search-btn" type="submit">Search</button>
          </form>
        </li>
        <li><a href="/explore">Explore</a></li>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </div>
</template>
  
<script>
export default {
  computed: {
    isLoggedIn() {
      return !!window.localStorage.getItem('token');
    }
  },

  methods: {
    logOut() {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userId');
      this.$router.push('/');
    }
  }
}
</script>
  
<style>
.nav-container {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 90px;
  z-index: 1;
  background: black;
}

.navigation {
  list-style: none;
  margin: 0px;
  padding: 0px;
  border-radius: 05px;
  overflow: auto;
  margin-top: 0px;
  z-index: 999;
}

.navigation li {
  float: right;
  margin-right: 7%;
  margin-top: 20px;
  font-size: 18px;
  color: white;
}

.navigation li a {
  display: block;
  text-decoration: none;
  color: #fff;
  padding: 15px 20px;
}

.navigation li a:hover {
  background-color: white;
  border-radius: 30px;
  color: black
}

.navbar-logo {
  vertical-align: middle;
  width: 100px;
  padding: 5px;
  float: left;
  margin-left: 7%;
  margin-top: 20px;
}

form {
  display: inline-block;
  margin-top: 10px;
}

input[type="text"] {
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
}

.search-btn {
  border-radius: 30px;
  border: none;
  padding: 10px 20px;
  background-color: white;
  color: black;
  cursor: pointer
}

.search-btn:hover {
  background-color: black;
  color: white
}
</style>
  