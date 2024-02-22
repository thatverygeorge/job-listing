<script setup>
import { useFiltersStore } from '@/stores/filters';
import IconClose from '@/components/icons/IconClose.vue';

const filtersStore = useFiltersStore();
</script>

<template>
  <section
    class="filters"
    aria-labelledby="filters-heading"
    :style="{ visibility: filtersStore.filters.length > 0 ? 'visible' : 'hidden' }"
  >
    <h2 class="visually-hidden" id="filters-heading">current filters</h2>
    <ul class="filters__list" role="list">
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
  padding: 1rem;
  background-color: var(--white);
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  box-shadow: 5px 5px 0 var(--black);
  transform: translateY(-50%);
}

.filters__list {
  margin: 0;
  padding: 0;
  list-style: none;
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
  color: var(--green);
  overflow: hidden;
}

.filters__item:focus-within {
  border-color: var(--black);
  color: var(--black);
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
  height: 24px;
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
  margin-left: auto;
  flex-shrink: 0;
}
</style>
