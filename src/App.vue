<template>
  <div id="app">
     <Notifs />
    
    <Header/>
  <router-view></router-view>
     <Footer/>
      
  </div>
</template>

<script>
import Home from '@/components/ShopiYa.vue'
import Header from '@/components/appcomponent/elements/parts/header.vue';
import Footer from '@/components/appcomponent/elements/parts/footer.vue';
import Notifs from '@/components/appcomponent/elements/parts/notifications.vue';

export default {
  name: 'app',
  components: {
    Home,Header,Footer,Notifs
  }
}
</script>


<style scoped>
#app{
  position: relative;
}
</style>
