import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { data } from '@/data';
import { useFiltersStore } from '@/stores/filters';

export const useJobsStore = defineStore('jobs', () => {
  const featuredJobs = data
    .filter((job) => job.isFeatured)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  const regularJobs = data
    .filter((job) => !job.isFeatured)
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());

  const sortedData = featuredJobs.concat(regularJobs);

  const jobs = ref(sortedData);

  const filtersStore = useFiltersStore();

  const filteredJobs = computed(() => {
    return filtersStore.filters.length > 0
      ? jobs.value.filter((job) =>
          filtersStore.filters.every((filter) => job.tags.includes(filter))
        )
      : jobs.value;
  });

  function getJobById(id) {
    return jobs.value.find((job) => job.id === id);
  }

  return { jobs, filteredJobs, getJobById };
});
