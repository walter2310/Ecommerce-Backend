<template>
   <div class="back-cont">
      <div class="main-cont-register">
         <div class="img-title-cont">
            <img src="../assets/ecommerce-logo.png" alt="" class="register-img">
         </div>

         <div class="register">
            <h1>Register</h1>
         </div>

         <form @submit.prevent>

            <div class="name-email-cont">
               <label class="register-label">Name</label>
               <input class="register-input" name="name" ref="name">

               <label class="register-label">Date of Birth</label>
               <input class="register-input" type="date" name="date" ref="date">

               <label class="register-label">Email</label>
               <input class="register-input" type="email" name="email" ref="email">

               <label class="register-label">Password</label>
               <input class="register-input" type="password" name="password" ref="password">

            </div>
            <div class="btn-cont">
               <button @click="register()" class="register-btn">Register</button>
            </div>
         </form>

         <div class="register-footer">
            <p>Already have an account? <a href="/login">Login</a></p>
         </div>

      </div>
   </div>
</template>

<script>
export default {
   name: 'Register',
   data() {
      return {
         name: '',
         data: '',
         email: '',
         password: '',
      }
   },

   methods: {
      async register() {
         let payload = {
            name: this.$refs.name.value,
            date: this.$refs.date.value,
            email: this.$refs.email.value,
            password: this.$refs.password.value,
         }

         try {
            await this.axios.post('http://localhost:5050/users', payload)
               .then(response => {
                  this.$router.push({ path: "/" })
                  this.$toast.success(`Successful sign up`);
               })
         } catch (error) {
            this.$toast.warning(`Sign up failed`)
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

.main-cont-register {
   height: 650px;
   width: 400px;
   background-color: white;
   margin-top: 70px;
   margin-left: 560px;
   border-radius: 30px;
}

.img-title-cont {
   display: flex;
   align-content: center;
   justify-content: center;

}

.register {
   display: flex;
   align-content: center;
   justify-content: center;
}


.name-email-cont {
   display: flex;
   flex-direction: column;
   margin-left: 30px;
}

.register-btn {
   border-radius: 30px;
   border: none;
   padding: 10px 20px;
   background-color: black;
   color: white;
   cursor: pointer;
}

.btn-cont {
   margin-top: 30px;
   margin-left: 150px;
}

.register-input {
   background: white;
   border-radius: 20px;
   padding: 10px 5px;
   line-height: 14px;
   border-color: #662D91;
   width: 150%;
   margin-top: 10px;
}

.register-label {
   margin-top: 10px;
}

.register-footer {
   display: flex;
   align-content: center;
   justify-content: center;
   color: #662D91;
}
</style>