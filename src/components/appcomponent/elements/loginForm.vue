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
                               
                  if (this.$store.getters.Errors !== 'undefined' &&  this.$store.getters.Errors != null) {

                            Object.keys(this.$store.getters.Errors).forEach(key => {
                            console.log(this.$store.getters.Errors[0]);   // Errors
                        });

                        
                    }else{
                        console.log("You're good you can get in") // Errors
                        //this.$router.push('/')

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
