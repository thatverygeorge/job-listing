<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="not-found" aria-labelledby="not-found-heading">
    <h2 class="not-found__heading" id="not-found-heading">404. Page not found</h2>
    <RouterLink class="not-found__link" to="/">go home</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
}

.not-found__heading {
  font-size: 2rem;
}

.not-found__link {
  font-size: 1.5rem;
}
</style>

