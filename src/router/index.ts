import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/products',
      component: () => import('../views/ProductsView.vue'),
      children: [
        {
          path: '/products/add',
          component: () => import('../views/ProductFormView.vue'),
        },
        {
          path: '/products/:id',
          component: () => import('../views/ProductFormView.vue'),
        },
      ],
    },
  ],
});

export default router;
