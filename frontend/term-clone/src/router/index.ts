import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: () => {
        if(!localStorage.getItem("accessToken")) {
          router.push({name: "Login"});
        }
      },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/newaccount',
      name: 'New Account',
      component: () => import('../views/login/NewAccount.vue')
    },
    { 
      //Rota pega tudo
      path: '/:catchAll(.*)', 
      redirect: '/'
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
