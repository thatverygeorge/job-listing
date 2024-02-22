import { createRouter, createWebHistory } from 'vue-router';
import { useJobsStore } from '@/stores/jobs';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home',
    },
    {
      path: '/job/:id',
      name: 'job',
      component: () => import('@/views/JobView.vue'),
      props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
      beforeEnter(to) {
        const jobsStore = useJobsStore();

        const doesDataExist = Boolean(jobsStore.getJobById(parseInt(to.params.id)));

        if (!doesDataExist) {
          return {
            name: 'notFound',
            params: { pathMatch: to.path.split('/').slice(1) },
            query: to.query,
            hash: to.hash,
          };
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;

