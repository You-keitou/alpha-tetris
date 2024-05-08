<template>
  <div class="hp-bar bg-gray-300 h-6 w-full rounded-full overflow-hidden">
    <div class="hp-fill bg-red-500 h-full" :style="hpBarStyle" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hpBarStyle: string;
}>();
</script>

<style lang="scss" scoped></style>
