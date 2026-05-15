import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/inventario',
    name: 'inventario',
    component: () => import('@/views/InventarioView.vue'),
  },
  {
    path: '/aprenda',
    name: 'aprenda',
    component: () => import('@/views/AprendaView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
