<script setup>
import { ref, onMounted } from 'vue';
import { useJobsStore } from '@/stores/jobs';
import ApplicationForm from '@/components/ApplicationForm.vue';
import * as focusTrap from 'focus-trap';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const modal = ref(null);

const jobsStore = useJobsStore();

const job = jobsStore.getJobById(props.id);

let trap;

function openModal() {
  modal.value.dialog.showModal();
  trap.activate();
}

function closeModal() {
  modal.value.dialog.close();
}

onMounted(() => {
  modal.value.dialog.addEventListener('close', () => {
    trap.deactivate();
  });

  trap = focusTrap.createFocusTrap(modal.value.dialog, {
    onDeactivate: closeModal,
  });
});
</script>

<template>
  <section class="job" aria-labelledby="job-heading">
    <div class="job__content">
      <h2 class="job__position" id="job-heading">{{ job.position }}</h2>

      <ul class="meta-list job__meta-list" aria-label="meta information" role="list">
        <li class="meta-list__item">
          <time :datetime="job.date">
            {{ new Intl.DateTimeFormat('en-US').format(new Date(job.date)) }}
          </time>
        </li>
        <li class="meta-list__item">
          <span>{{ job.type }}</span>
        </li>
        <li class="meta-list__item">
          <span>{{ job.location }}</span>
        </li>
      </ul>

      <p class="job__description">{{ job.description }}</p>

      <ul class="tag-list job__tag-list" aria-label="tags" role="list">
        <li class="tag-list__item" v-for="tag in job.tags" :key="tag">
          {{ tag }}
        </li>
      </ul>
    </div>

    <div class="job__sidebar">
      <h3 class="job__company">{{ job.company }}</h3>
      <img
        class="job__logo"
        src="@/assets/logo.png"
        width="64"
        height="64"
        alt=""
        role="presentation"
      />
    </div>

    <button
      class="button button--primary job__button job__button--apply"
      type="button"
      @click="openModal"
    >
      apply
    </button>
  </section>

  <Teleport to="body">
    <ApplicationForm ref="modal" @close-modal="closeModal" />
  </Teleport>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: 3rem;
}

.job__content {
  grid-column: 2 / -1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.job__position {
  margin: 0;
  font-size: 2rem;
  color: var(--green);
  text-transform: capitalize;
}

.job__description {
  margin: 0;
  font-size: 1.5rem;
}

.tag-list__item {
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0.7;
}

.tag-list__item:not(:last-child)::after {
  content: ' \2022';
}

.job__sidebar {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.job__logo {
  order: 1;
  border-radius: 50%;
}

.job__company {
  order: 2;
  margin: 0;
  font-size: 1.5rem;
}

.job__button--apply {
  grid-column: 2 / -1;
}

@media (max-width: 960px) {
  .job {
    grid-template-columns: 1fr;
  }

  .job__content {
    grid-column: 1 / -1;
  }

  .job__sidebar {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: center;
  }

  .job__button--apply {
    grid-column: 1 / -1;
  }
}
</style>
