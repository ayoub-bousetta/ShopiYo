<template>
    <nav>
        <ul>
            <li>My Area Shops</li>
            <li v-if="isAuth">My Preffered Shops</li><!--Show Loged in users-->
            <li v-if="!isAuth">Login</li>
             <li v-if="!isAuth">Register</li>

        </ul>
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

