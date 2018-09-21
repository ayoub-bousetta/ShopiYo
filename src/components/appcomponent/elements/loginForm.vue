<template>
    <div class="regfor">
          <form v-on:submit.prevent="logMein">
              <input type="email" autocomplete  v-model="email"  />
        <input type="password" autocomplete  v-model="password" />
        <button  >Let rock</button>

        </form>
    </div>
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
