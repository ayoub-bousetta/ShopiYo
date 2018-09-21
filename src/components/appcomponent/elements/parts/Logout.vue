<template>
    <div class="regfor">
      
    </div>
</template>
<script>
export default {
    name:'Logout',
  mounted () {



    this.$store.dispatch('LogOut');

    

    
  },
  
}
</script>
