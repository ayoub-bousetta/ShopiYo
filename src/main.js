import Vue from 'vue'
import App from './App.vue'
//import VueResource from 'vue-resource'
import './assets/css/main.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import store from './store/store'



Vue.config.productionTip = false


// Use packages
//Vue.use(VueResource);
Vue.use(VueRouter);

// Register routes
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({store,
  render: h => h(App),router: router
}).$mount('#app')


//axios.defaults.headers.common['Accept'] = 'application/json'
