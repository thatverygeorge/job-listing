<script setup>
import { useFiltersStore } from '@/stores/filters';
import IconClose from '@/components/icons/IconClose.vue';

const filtersStore = useFiltersStore();
</script>

<template>
  <section
    class="filters"
    aria-labelledby="filters-heading"
    :style="{ display: filtersStore.filters.length > 0 ? 'grid' : 'none' }"
  >
    <h2 class="visually-hidden" id="filters-heading">current filters</h2>
    <ul class="filters__list">
      <li class="filters__item" v-for="item in filtersStore.filters" :key="item">
        <span>{{ item }}</span>
        <button
          class="button filters__button filters__button--remove"
          type="button"
          @click="filtersStore.removeFilter(item)"
        >
          <span class="visually-hidden">remove filter: {{ item }}</span>
          <IconClose />
        </button>
      </li>
    </ul>

    <button
      class="button filters__button filters__button--clear"
      type="button"
      @click="filtersStore.clearFilters"
    >
      <span class="visually-hidden">remove all filters</span>
      <span aria-hidden="true">clear</span>
    </button>
  </section>
</template>

<style scoped>
.filters {
  background-color: var(--white);
  grid-template-columns: 1fr max-content;
  gap: 2rem;
}

.filters__list {
  padding: 1rem;
  border: 1px solid var(--black);
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
}

.filters__item {
  background-color: var(--white);
  display: flex;
  align-items: center;
  border: 1px solid var(--green);
  border-radius: 5px;
  color: var(--black);
  overflow: hidden;
}

.filters__item:focus-within {
  border-color: var(--black);
}

.filters__item:focus-within .filters__button--remove {
  background-color: var(--black);
}

.filters__item span {
  font-weight: bold;
  padding: 0 0.5rem;
  max-width: 15rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.filters__button--remove {
  background-color: var(--green);
  padding: 0;
  border: none;
  border-radius: 0;
}

.filters__button--remove svg {
  display: flex;
  fill: var(--white);
}

@media (hover: hover) {
  .filters__button--remove:hover {
    background-color: var(--black);
  }
}

.filters__button--clear {
  border-color: var(--black);
}
</style>
