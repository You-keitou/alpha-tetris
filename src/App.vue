<script setup lang="ts">
import Board from './components/organisms/Board.vue';
import EnemyField from './components/organisms/EnemyField.vue';
import Layout from './components/templates/MainLayout.vue';
</script>

<template>
  <Layout class="flex flex-col min-h-screen">
    <Board />
    <EnemyField />
    <Board />
  </Layout>
</template>

<style scoped></style>
