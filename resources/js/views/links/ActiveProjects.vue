<script setup>
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <h1 class="text-3xl mb-3">{{ route.meta.title }}</h1>
</template>

<style scoped>

</style>