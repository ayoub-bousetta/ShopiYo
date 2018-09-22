<template>
 

     <section class='login'><!--For Login and register Template in vue-->

                <div class="container">

                        <div class="title_form">

                                <h2>Login</h2><span>No Account yet? : <router-link to="register">Create one</router-link></span>
                        </div>
                  
                          
                            <form v-on:submit.prevent="logMein">
                                <div class="form-group">
                                        <label for="usr">Email:</label>
                                      
                                                      <input type="email" autocomplete  v-model="email"  class="form-control" id="usr">

                                </div>
                                <div class="form-group">
                                        <label for="pwd">Password:</label>
                                           <input type="password" autocomplete  v-model="password" class="form-control" id="pwd">
                                    
                                </div>

                                <div class="form-group">
                                        <button>Login</button>
                                </div>

                               
                              </form>

                        
                </div>
            </section>
</template>
<script>

export default {
    name:'LogForm',

  

data(){
        return{
            email:"aubbusta@gmail.com",
            password:"your password",
            dataArray:[]
         
        }
    },
      methods:{
                logMein(){

                            

                            this.dataArray={
                                "email":this.email,
                                "password":this.password,
                            }
                            
                            
                      
                            
                            this.$store.dispatch('AuthRequest', this.dataArray).then(() => {


                                if (this.$store.getters.Errors[1] == "success") {
                                    this.$router.push('/')
                                }
                                  
                            })
                 }
        }

   }
</script>


