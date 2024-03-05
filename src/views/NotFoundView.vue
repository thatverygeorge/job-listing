<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="not-found" aria-labelledby="not-found-heading">
    <h2 id="not-found-heading">404. Page not found</h2>
    <RouterLink :to="{ name: 'home' }">go home</RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.not-found h2 {
  font-size: 2rem;
}

.not-found a {
  font-size: 1.5rem;
}
</style>

