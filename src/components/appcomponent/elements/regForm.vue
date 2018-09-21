<template>
    


      <section class='login'><!--For Login and register Template in vue-->

                <div class="container">

                        <div class="title_form">

                                <h2>Register </h2><span>You already ? : <router-link to="login">have one</router-link></span>
                        </div>
                  

                            <form v-on:submit.prevent="register">
                                <div class="form-group">
                                        <label for="usr">Email:</label>
                                      
                                                      <input type="email" autocomplete  v-model="email"  class="form-control" id="usr">

                                </div>
                                <div class="form-group">
                                        <label for="pwd">Password:</label>
                                           <input type="password" autocomplete  v-model="password" class="form-control" id="pwd">
                                    
                                </div>

                                <div class="form-group">
                                        <button>Create Account</button>
                                </div>

                               
                              </form>

                        
                </div>
            </section> 
</template>
<script>
export default {
    name:'RegForm',

    data(){
        return{
            email:"aubbusta@gmail.com",
            password:"your password",
            dataArray:[]
         
        }
    },

    methods:{
        register(){

            

            this.dataArray={
                 "email":this.email,
                "password":this.password,
            }
               
            this.$store.dispatch('RegisterUser', this.dataArray).then(()=>{
              //this.$router.push('/account/login')

           
              if (this.$store.getters.Errors !== 'undefined' &&  this.$store.getters.Errors != null) {


               

                    Object.keys(this.$store.getters.Errors).forEach(key => {
                    console.log(this.$store.getters.Errors[key]);   // Errors
                });

                  
              }else{
                console.log("You're good you can get in") // Errors
                this.$router.push('/login')

              }
            
             
          })
         

        }
    }


}
</script>

<style scoped>
.login {
    background: #efeceb;
}
</style>