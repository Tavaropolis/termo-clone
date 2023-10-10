import { createRouter, createWebHistory } from 'vue-router';
const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            beforeEnter: () => {
                if (!localStorage.getItem("accessToken")) {
                    router.push({ path: "/Login" });
                }
                ;
            },
            component: () => import('../views/Home.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Login.vue')
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
});
// router.beforeEach(async (to, from) => {
//   if (
//     !localStorage.getItem("accessToken") && to.name !== 'Login'
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' }
//   }
// })
export default router;
//# sourceMappingURL=index.js.map