<template>
    

      <nav>
            <ul>
            <li><router-link to="/">All Shops</router-link></li>
            <!-- <li><a href="#">Nearby Shops</a></li> -->
            <li v-if="isAuth"><router-link to="preferred">My Preffered Shops</router-link></li><!--Show Loged in users-->
            <li v-if="isAuth"><router-link to="logout">Logout</router-link></li><!--Show Loged in users-->
            <li v-if="!isAuth"><router-link to="login">Login</router-link></li>
             <li v-if="!isAuth"><router-link to="register">Register</router-link> </li>
        
             </ul>

       
    <!-- { path: '/me', name: 'account',component: Account}, -->
  
    </nav>
</template>

<script>
export default {
    name:'NavBar',

    computed:{

        isAuth(){
            return this.$store.getters.isAuth;
            
        }

    }
}
</script>

