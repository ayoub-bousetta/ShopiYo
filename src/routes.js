//import Preferred from './components/showBlogs.vue';
import Account from './components/appcomponent/Account.vue';
import LogForm from './components/appcomponent/elements/loginForm.vue';
import RegForm from './components/appcomponent/elements/regForm.vue';
import logOut from './components/appcomponent/elements/parts/Logout.vue';
import Home from './components/HelloWorld.vue'
import PreferredShop from './components/appcomponent/Preferred.vue';

export default [
    { path: '/', name: 'home',component: Home},
    { path: '/account', name: 'account',component: Account},
   { path: '/login', name: 'login',component: LogForm},
   { path: '/register', name: 'register',component: RegForm}, 
   { path: '/logout', name: 'logout',component: logOut},
   { path: '/preferred', name: 'preferred',component: PreferredShop}
]