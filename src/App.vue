<template>
  <div id="app">
    
    <Header/>
  <router-view></router-view>
     <Footer/>
       <Notifs />
  </div>
</template>

<script>
import Home from '@/components/HelloWorld.vue'
import Shops from '@/components/appcomponent/Shops.vue';
import Header from '@/components/appcomponent/elements/header.vue';
import Footer from '@/components/appcomponent/elements/footer.vue';
import Notifs from '@/components/appcomponent/elements/parts/notifications.vue';

export default {
  name: 'app',
  components: {
    Home,Header,Footer,Notifs
  }
}
</script>
