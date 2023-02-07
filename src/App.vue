<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <main class="main">
    <h1 class="main__heading">
      <RouterLink :to="{ name: 'home' }">Dream Job</RouterLink>
    </h1>

    <button
      v-if="$route.name !== 'home'"
      class="button button--primary main__button main__button--go-back"
      type="button"
      @click="$router.back"
    >
      go back
    </button>

    <RouterView />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 3rem;
  position: relative;
  padding-top: 16rem;
}
.main__heading {
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 4rem;
  text-shadow: 2px 2px 0 var(--black);
}
.main__heading a {
  color: var(--white);
}

.main__button--go-back {
  transform: translateY(-50%);
}
</style>

