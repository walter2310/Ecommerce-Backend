<template>
   <div class="back-cont">
      <div class="main-cont-login">
         <div class="img-title-cont">
            <img src="../assets/ecommerce-logo.png" alt="" class="register-img">
         </div>

         <div class="login">
            <h1>Login</h1>
         </div>

         <form @submit.prevent>

            <div class="name-email-cont">

               <label class="login-label">Email</label>
               <input class="login-input" type="email" name="email" ref="email">

               <label class="login-label">Password</label>
               <input class="login-input" type="password" name="password" ref="password">

            </div>
            <div class="btn-cont">
               <button @click="login()" class="login-btn">Login</button>
            </div>
         </form>


         <div>
            <p class="login-footer">Do not have an account? <a href="/register" class="login-footer"> Register</a></p>
            <a href="/" class="login-footerr">Back to home</a>
         </div>

      </div>
   </div>
</template>
  
<script>
import  useJwt  from 'jwt-decode'

export default {
   name: 'Login',
   data() {
      return {
         email: '',
         password: '',
      }
   },

   methods: {
      async login() {
         let payload = {
            email: this.$refs.email.value,
            password: this.$refs.password.value,
         }

         try {
            await this.axios.post('http://localhost:5050/users/login', payload)
               .then(response => {
                  window.localStorage.setItem("token", response.data.token);
                  const { id } = useJwt(response.data.token);
                  window.localStorage.setItem("userId", id);

                  this.$router.push({ path: "/" });
                  this.$toast.success(`Successful sign in`);
               });
               
         } catch (error) {
            this.$toast.warning(`Sign in failed`)
         }

      }
   }

}
</script>
  
<style>

.register-img {
   max-width: 30%;
   border-radius: 10px;
   margin-top: 20px;
}

.main-cont-login {
   height: 500px;
   width: 400px;
   background-color: white;
   margin-top: 110px;
   margin-left: 560px;
   border-radius: 30px;
}

.img-title-cont {
   display: flex;
   align-content: center;
   justify-content: center;

}

.login {
   display: flex;
   align-content: center;
   justify-content: center;
}


.name-email-cont {
   display: flex;
   flex-direction: column;
   margin-left: 30px;
}

.login-btn {
   border-radius: 30px;
   border: none;
   padding: 10px 20px;
   background-color: black;
   color: white;
   cursor: pointer;
}

.btn-cont {
   margin-top: 30px;
   margin-left: 165px;
}

.login-input {
   background: white;
   border-radius: 20px;
   padding: 10px 5px;
   line-height: 14px;
   border-color: #662D91;
   width: 150%;
   margin-top: 10px;
   padding: 10px;
}

.login-label {
   margin-top: 10px;
}

.login-footer {
   display: flex;
   align-content: center;
   justify-content: center;
   color: #662D91;
}

.login-footerr{
   margin-left: 157px;
}
</style>