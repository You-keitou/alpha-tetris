<template>
  <div class="m-10">
    <div class="min-w-96 min-h-96">
      <img src="../../assets/image.png" alt="enemy" width="400" height="400" />
    </div>
    <HpBar class="mt-5" :hp-bar-style="hpBarStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import HpBar from '../molecules/HpBar.vue';

const hp = defineModel<number>('hp');
const hpBarStyle = computed(() => `width: ${hp.value}%`);
</script>

<style lang="scss" scoped></style>
