import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import Catalog from "../pages/catalog/Catalog.vue";
import CatalogDetail from "../pages/catalog/CatalogDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog,
    },
    {
      path: '/catalog/detail/:id',
      name: 'CatalogDetail',
      component: CatalogDetail,
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router