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
              

                                if (this.$store.getters.Errors[1] == "success") {
                                    this.$router.push('/')
                                }
            
             
             })
         

        }
    }


}
</script>

