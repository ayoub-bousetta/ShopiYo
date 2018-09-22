<template>
    <div class="regfor">
      
    </div>
</template>
<script>
export default {
    name:'LogOut',
  mounted () {


    this.$store.dispatch('LogOut');
      this.$store.dispatch('KillNotifications');
  this.$router.push('/')  
  },
  
}
</script>
