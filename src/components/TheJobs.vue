<script setup>
import { useJobsStore } from '@/stores/jobs';
import { useNumberOfJobsToShowStore } from '@/stores/numberOfJobsToShow';
import JobCard from '@/components/JobCard.vue';

const jobsStore = useJobsStore();
const numberOfJobsToShowStore = useNumberOfJobsToShowStore();
</script>

<template>
  <section v-if="jobsStore.filteredJobs.length > 0" class="jobs" aria-labelledby="jobs-heading">
    <h2 class="visually-hidden" id="jobs-heading">jobs for you</h2>
    <span class="jobs__result" aria-live="polite" role="status">
      Results: {{ jobsStore.filteredJobs.length }}
    </span>

    <ul class="jobs__list" role="list">
      <li
        class="jobs__item"
        v-for="job in jobsStore.filteredJobs.slice(0, numberOfJobsToShowStore.numberOfJobsToShow)"
        :key="job.id"
      >
        <JobCard :job="job" />
      </li>
    </ul>

    <button
      v-if="jobsStore.filteredJobs.length > numberOfJobsToShowStore.numberOfJobsToShow"
      class="button button--primary jobs__button jobs__button--show-more"
      type="button"
      @click="numberOfJobsToShowStore.showMore"
    >
      show more
    </button>
  </section>
</template>

<style scoped>
.jobs {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.jobs__result {
  font-size: 2rem;
}

.jobs__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.jobs__button--show-more {
  max-width: 100%;
}

@media (max-width: 960px) {
  .jobs {
    gap: calc(3rem + 32px);
  }
  .jobs__list {
    gap: calc(3rem + 32px);
  }
}
</style>
