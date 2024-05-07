<template>
  <div>
    <Header />
    <main class="flex-1 bg-gray-100 flex justify-center items-center">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '../organisms/Header.vue';
</script>

<style lang="scss" scoped></style>
