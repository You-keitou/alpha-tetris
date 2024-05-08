<template>
  <header class="bg-black text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-3xl font-bold">Monster Tetris Battle</h1>
      <div>
        <button
          class="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          @click="isDialogOpened = !isDialogOpened"
        >
          Settings
        </button>
      </div>
    </div>
  </header>
  <KeyConfig :is-visible="isDialogOpened" @close="isDialogOpened = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import KeyConfig from '../organisms/settings/KeyConfig.vue';

const isDialogOpened = ref(false);
</script>

<style lang="scss" scoped></style>
