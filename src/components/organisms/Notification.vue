<template>
  <transition name="fade">
    <div v-if="message" class="fixed inset-0 flex items-center justify-center p-4">
      <div
        class="bg-black bg-opacity-75 text-white text-center p-8 rounded-lg shadow-lg max-w-lg w-full"
      >
        <p class="text-xl md:text-3xl">{{ props.message }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string;
}>();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
