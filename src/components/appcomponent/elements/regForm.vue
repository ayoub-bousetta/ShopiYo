<template>
    <div class="regfor">
        <form v-on:submit.prevent="register">
              <input type="email" autocomplete  v-model="email"  />
        <input type="password" autocomplete  v-model="password" />
        <button  >Let rock</button>

        </form>
      
    </div>
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
