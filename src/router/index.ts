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
          path: 'add',
          component: () => import('../views/ProductFormView.vue'),
        },
        {
          path: 'add/veevalidate',
          component: () => import('../views/ProductFormViewVee.vue'),
        },
        {
          path: ':id',
          component: () => import('../views/ProductFormView.vue'),
        },
      ],
    },
    {
      path: '/async-validate',
      component: () => import('../views/AsyncValidationView.vue'),
    },
    {
      path: '/pinia-store',
      component: () => import('../views/PiniaUsers.vue'),
    },
  ],
});

export default router;
