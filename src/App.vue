<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue';
import { keysConfig } from './utils/settings/keySettings';

import Board from './components/organisms/Board.vue';
import EnemyField from './components/organisms/EnemyField.vue';
import Layout from './components/templates/MainLayout.vue';
import Notification from './components/organisms/Notification.vue';

const playersKeyConfig = ref(keysConfig);
provide('playersKeyConfig', playersKeyConfig);

// モンスター状態管理　HPのみ
const enemyHp = ref(100);

//　ゲーム状況の管理
const gameStart = ref(false);
const gameEnd = ref(false);

watchEffect(() => {
  if (enemyHp.value === 0) {
    showNotification('You Win', 10000);
    gameEnd.value = true;
    gameStart.value = false;
  }
});

// 通知コンポーネントの管理
const isVisible = ref(false);
const message = ref('');
const showNotification = (msg: string, timeout: number) => {
  if (!gameEnd.value) {
    message.value = msg;
    isVisible.value = true;
    setTimeout(() => {
      isVisible.value = false;
      message.value = '';
    }, timeout);

    gameEnd.value = true;
    gameStart.value = false;
  }
};
</script>

<template>
  <Layout class="flex flex-col min-h-screen relative">
    <button
      v-if="!gameStart || gameEnd"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute"
      @click="
        () => {
          gameEnd = false;
          gameStart = true;
        }
      "
    >
      Start Game
    </button>
    <Notification :message="message" v-if="isVisible" />
    <Board
      :game-start="gameStart"
      :game-end="gameEnd"
      :key-config="playersKeyConfig[0]"
      @attack="() => (enemyHp -= 10)"
      @game-over="showNotification('You Lose', 10000)"
    />
    <EnemyField v-model:hp="enemyHp" />
    <Board
      :game-start="gameStart"
      :game-end="gameEnd"
      :key-config="playersKeyConfig[1]"
      @attack="() => (enemyHp -= 10)"
      @game-over="showNotification('You Lose', 1000)"
    />
  </Layout>
</template>

<style scoped></style>
