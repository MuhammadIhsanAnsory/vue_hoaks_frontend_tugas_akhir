import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

//auth
import Home from '@/views/guest/Index.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

// user
import Dashboard from '@/views/user/dashboard/Index.vue';
import ReportShow from '@/views/user/report/Show.vue';
import ReportCreate from '@/views/user/report/Create.vue';
import ReportEdit from '@/views/user/report/Edit.vue';

// admin
import DashboardAdmin from '@/views/admin/dashboard/Index.vue'; 

import NotFound from '@/views/PageNotFound.vue';

Vue.use(VueRouter)
// middleware 
const isAdmin = (to, from, next) => {
  if (store.getters['auth/isAdmin']) {
    return next()
  } else {
    return next({
      name: "guest.index"
    })
  }
}

const isUser = (to, from, next) => {
  if (store.getters['auth/isUser']) {
    return next()
  } else {
    return next({
      name: "admin.dashboard"
    })
  }
}



const routes = [
  {
    path: '/',
    name: 'guest.index',
    component: Home
  },
  // auth
  {
    path: '/login',
    name: 'guest.login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },

  // admin
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: DashboardAdmin,
    beforeEnter: isAdmin
  },
  
  // user
  {
    path: '/panel/aduan',
    name: 'user.dashboard',
    component: Dashboard,
    beforeEnter: isUser
  },
  {
    path: '/panel/aduan/tambah',
    name: 'user.report.create',
    component: ReportCreate,
    beforeEnter: isUser
  },
  {
    path: '/panel/aduan/detail/:id/:slug',
    name: 'user.report.show',
    component: ReportShow,
    beforeEnter: isUser
  },
  {
    path: '/panel/aduan/edit/:id/:slug',
    name: 'user.report.edit',
    component: ReportEdit,
    beforeEnter: isUser
  },




  // 404 NOT FOUND
  { 
    path: "*",
    name: 'PageNotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
