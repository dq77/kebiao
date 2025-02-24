import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/23xia',
      name: '23xia',
      component: () => import('../views/23xia.vue')
    },
    {
      path: '/24shang',
      name: '24shang',
      component: () => import('../views/24shang.vue')
    }
  ]
})

export default router
