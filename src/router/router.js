import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthLayout from "../core/components/layout/AuthLayout";
import Login from "../modules/Auth/Login";
import authService from "../core/services/authService";
import DefaultLayout from "../core/components/layout/DefaultLayout";
import Home from "../modules/Home/Home";
import Blog from "../modules/Blog/Blog";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      redirect: '/login',
      component: AuthLayout,
      meta: {guest: true},
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DefaultLayout,
      redirect: '/dashboard/home',
      meta: {requiresAuth: true},
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'blog/:blogUuid',
          name: 'blog',
          component: Blog,
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authService.loggedIn()) {
      next({name: 'login'})
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest) && authService.loggedIn()) {
    next({name: 'dashboard'})
  } else {
    next()
  }
});

export default router;