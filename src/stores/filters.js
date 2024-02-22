import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { useNumberOfJobsToShowStore } from '@/stores/numberOfJobsToShow';

export const useFiltersStore = defineStore('filters', () => {
  const filters = ref([]);

  const numberOfJobsToShowStore = useNumberOfJobsToShowStore();

  function addFilter(newFilter) {
    const wasFilterAddedAlready = filters.value.some((el) => el === newFilter);

    if (wasFilterAddedAlready) return;

    filters.value.push(newFilter);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function removeFilter(filterToDelete) {
    filters.value = filters.value.filter((el) => el !== filterToDelete);
  }

  function clearFilters() {
    filters.value = [];
  }

  watch(filters, numberOfJobsToShowStore.reset, { deep: true });

  return { filters, addFilter, removeFilter, clearFilters };
});

