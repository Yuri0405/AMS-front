import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Races from '../views/Races.vue'
import Register from '../views/SignIn.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import {store} from '../store/store.js'

let isAuthorized = false;

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/races',
    name:'races',
    component: Races
  },
  {
    path: '/cart',
    name:'cart',
    component: Cart
  },
  {
    path: '/register',
    name:'register',
    component:Register
  },
  {
    path: '/login',
    name:'login',
    component:Login
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to)=>
{
    const publicPages = ['/login',"/","/home","/register","/races"]
    const authreqired = !publicPages.includes(to.path)
    isAuthorized = store.getters.isLogedIn
    if(!isAuthorized && authreqired)
    {
        return "/login"
    }
    
})

export default router
