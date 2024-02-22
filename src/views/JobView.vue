<script setup>
import TheJob from '@/components/TheJob.vue';
defineProps({
  id: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <TheJob :id="id" />
</template>
