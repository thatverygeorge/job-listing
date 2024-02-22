import { ref } from 'vue';
import { defineStore } from 'pinia';

const INITIAL_NUMBER = 5;
const SHOW_MORE_STEP = 5;

export const useNumberOfJobsToShowStore = defineStore('numberOfJobsToShow', () => {
  const numberOfJobsToShow = ref(INITIAL_NUMBER);

  function showMore() {
    numberOfJobsToShow.value = numberOfJobsToShow.value + SHOW_MORE_STEP;
  }

  function reset() {
    numberOfJobsToShow.value = INITIAL_NUMBER;
  }

  return { numberOfJobsToShow, showMore, reset };
});
