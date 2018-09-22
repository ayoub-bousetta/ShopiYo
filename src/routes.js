//import Preferred from './components/showBlogs.vue';
import LogForm from './components/appcomponent/elements/loginForm.vue';
import RegForm from './components/appcomponent/elements/regForm.vue';
import logOut from './components/appcomponent/elements/Logout.vue';
import Home from './components/ShopiYa.vue'
import PreferredShop from './components/appcomponent/Preferred.vue';

export default [
    { path: '/', name: 'home',component: Home},
   { path: '/login', name: 'login',component: LogForm,meta: { requiresVisitor: true }},
   { path: '/register', name: 'register',component: RegForm,meta: { requiresVisitor: true }}, 
   { path: '/logout', name: 'logout',component: logOut,meta: { requiresAuth: true }},
   { path: '/preferred', name: 'preferred',component: PreferredShop,meta: { requiresAuth: true }}
]