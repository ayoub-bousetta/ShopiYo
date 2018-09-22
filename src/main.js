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

// Check routes requiresAuth/requiresVisitor
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
  
    if (!store.getters.isAuth) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
  
    if (store.getters.isAuth) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next()
  }



})





new Vue({router:router,store:store,
  render: h => h(App)
}).$mount('#app')







//axios.defaults.headers.common['Accept'] = 'application/json'
