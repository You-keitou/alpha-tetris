<script setup lang="ts">
import { provide, ref } from 'vue';
import { keysConfig } from './utils/settings/keySettings';

import Board from './components/organisms/Board.vue';
import EnemyField from './components/organisms/EnemyField.vue';
import Layout from './components/templates/MainLayout.vue';

const playersKeyConfig = ref(keysConfig);
provide('playersKeyConfig', playersKeyConfig);
</script>

<template>
  <Layout class="flex flex-col min-h-screen">
    <Board :key-config="playersKeyConfig[0]" />
    <EnemyField />
    <Board :key-config="playersKeyConfig[1]" />
  </Layout>
</template>

<style scoped></style>
