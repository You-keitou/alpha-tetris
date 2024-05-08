<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl">
      <div class="p-5">
        <h2 class="text-xl font-bold mb-4">Key Configuration</h2>
        <div class="grid grid-cols-2 gap-8">
          <div
            v-for="playerKeyConfig in playersKeyConfig"
            :key="playerKeyConfig.playerNumber"
            class="space-y-4"
          >
            <h3 class="text-lg font-semibold">Player {{ playerKeyConfig.playerNumber }}</h3>
            <div class="grid grid-rows-2 grid-flow-col gap-2">
              <div class="col-span-3">
                <button
                  :key="'rotation'"
                  @keydown="handleKeydown($event, playerKeyConfig, 'rotation')"
                  class="bg-white border-2 border-gray-300 rounded hover:bg-gray-100 p-2 text-center w-full"
                >
                  {{ playerKeyConfig.controls.rotation }}
                </button>
              </div>
              <button
                v-for="(assignedKey, action) in (({ moveLeft, moveDown, moveRight }) => {
                  return {
                    moveLeft,
                    moveDown,
                    moveRight,
                  };
                })(playerKeyConfig.controls)"
                :key="action"
                @keydown="handleKeydown($event, playerKeyConfig, action)"
                class="bg-white border-2 border-gray-300 rounded hover:bg-gray-100 p-2 text-center"
              >
                {{ assignedKey }}
              </button>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <button
            @click="closeModal"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { inject, Ref } from 'vue';
import { PlayerKeysConfig } from '../../../types/settings/keySettings';

defineProps<{
  isVisible: Boolean;
}>();
const emit = defineEmits(['close']);

const playersKeyConfig = inject<Ref<PlayerKeysConfig[]>>('playersKeyConfig');

const handleKeydown = (
  event: KeyboardEvent,
  keyConfig: PlayerKeysConfig,
  action: 'rotation' | 'moveLeft' | 'moveDown' | 'moveRight',
) => {
  event.preventDefault();
  keyConfig.controls[action] = event.key;
};

const closeModal = () => {
  localStorage.setItem('keysConfig', JSON.stringify(playersKeyConfig?.value));
  emit('close');
};
</script>
