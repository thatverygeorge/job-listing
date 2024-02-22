import { createRouter, createWebHashHistory } from 'vue-router';
import { useJobsStore } from '@/stores/jobs';
import HomeView from '@/views/HomeView.vue';
import JobView from '@/views/JobView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      component: JobView,
      props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to) => {
  if (to.name === 'job') {
    const jobsStore = useJobsStore();

    const doesDataExist = Boolean(jobsStore.getJobById(parseInt(to.params.id)));

    if (!doesDataExist) {
      router.replace({
        name: 'notFound',
        params: { pathMatch: to.path.split('/').slice(1) },
        query: to.query,
        hash: to.hash,
      });
    }
  }
});

export default router;

