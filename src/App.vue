<script setup>
import { RouterView } from 'vue-router';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<template>
  <TheHeader />

  <main class="main container">
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

  <TheFooter />
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  position: relative;
}

.main__button--go-back {
  transform: translateY(-50%);
}
</style>

