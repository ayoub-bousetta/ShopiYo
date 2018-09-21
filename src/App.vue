<template>
  <div id="app">
    <Header/>
  <router-view></router-view>
     <Footer/>
  </div>
</template>

<script>
import Home from './components/HelloWorld.vue'

import Header from '@/components/appcomponent/elements/header.vue';
import Footer from '@/components/appcomponent/elements/footer.vue';
export default {
  name: 'app',
  components: {
    Home,Header,Footer
  }
}
</script>
