<script setup>
import { RouterLink } from 'vue-router';
import { useFiltersStore } from '@/stores/filters';

const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

const filtersStore = useFiltersStore();
</script>

<template>
  <article class="job-card" :class="{ 'job-card--featured': props.job.isFeatured }">
    <div class="job-card__container">
      <h3 class="job-card__position">
        <RouterLink :to="{ name: 'job', params: { id: props.job.id } }">
          {{ props.job.position }}
        </RouterLink>
      </h3>

      <h4 class="job-card__company">{{ props.job.company }}</h4>

      <span v-if="props.job.isFeatured" class="visually-hidden">this job is featured</span>

      <ul class="meta-list job-card__meta-list" aria-label="meta information" role="list">
        <li class="meta-list__item">
          <time :datetime="props.job.date">
            {{ new Intl.DateTimeFormat('en-US').format(new Date(props.job.date)) }}
          </time>
        </li>
        <li class="meta-list__item">
          <span>{{ props.job.type }}</span>
        </li>
        <li class="meta-list__item">
          <span>{{ props.job.location }}</span>
        </li>
      </ul>
    </div>

    <img
      class="job-card__logo"
      src="@/assets/logo.png"
      width="64"
      height="64"
      alt=""
      role="presentation"
    />

    <ul class="tag-list job-card__tag-list" aria-label="tags" role="list">
      <li class="tag-list__item" v-for="tag in props.job.tags" :key="tag">
        <button class="button tag-list__button" type="button" @click="filtersStore.addFilter(tag)">
          <span class="visually-hidden">add filter: {{ tag }}</span>
          <span aria-hidden="true">{{ tag }}</span>
        </button>
      </li>
    </ul>
  </article>
</template>

<style>
.job-card {
  padding: 2rem;
  padding-left: calc(2rem + 5px);
  display: grid;
  grid-template-columns: min-content 1fr 1fr;
  align-items: center;
  gap: 2rem;
  border: 1px solid var(--green);
  border-radius: 5px;
  box-shadow: 5px 5px 0 var(--black);
}

.job-card--featured {
  padding-left: 2rem;
  border-left: 5px solid var(--green);
}

.job-card * {
  order: 2;
}

.job-card__logo {
  order: 1;
  border-radius: 50%;
}

.job-card__container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.job-card__company {
  order: 1;
  margin: 0;
  font-size: 1.5rem;
}

.job-card__position {
  margin: 0;
  font-size: 2rem;
  text-transform: capitalize;
}

.meta-list,
.tag-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.meta-list__item {
  max-width: 10rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0.7;
}

.meta-list__item:not(:last-child)::after {
  content: ' \2022';
}

.job-card__tag-list {
  justify-content: flex-end;
}

.tag-list__button {
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@media (max-width: 960px) {
  .job-card {
    grid-template-columns: 1fr;
    position: relative;
    padding-top: calc(2rem + 32px);
  }

  .job-card__logo {
    position: absolute;
    top: 0;
    left: 2rem;
    transform: translateY(-50%);
  }

  .job-card__tag-list {
    justify-content: flex-start;
  }
}
</style>
