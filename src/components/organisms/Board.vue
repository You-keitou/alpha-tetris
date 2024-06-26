<template>
  <div class="min-w-60 w-60 flex flex-wrap">
    <div v-for="(cell, index) in boardCells" :key="index" :style="cell.style" class="w-6 h-6" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { initBlock, initBoard } from '../../utils/board/boardUtils';
import { BlockShape, BlockStatus } from '../../types/board';
import type { PlayerKeysConfig } from '../../types/settings/keySettings';

const props = defineProps<{
  gameStart: boolean;
  gameEnd: boolean;
  keyConfig: PlayerKeysConfig;
}>();

const emit = defineEmits(['attack', 'gameOver']);

//　タイマーを管理
const timerId = ref<number | undefined>(undefined);

// キーボードハンドラーを管理
const onKeyDown = ref<(event: KeyboardEvent) => void>();

// ブロック形状の定義
/**
 * [rotationMax, [dx, dy]]
 */
const blockShapes: BlockShape[] = [
  [0],
  [2, [-1, 0], [1, 0], [2, 0]],
  [2, [-1, 0], [0, 1], [1, 1]],
  [2, [-1, 0], [0, -1], [1, -1]],
  [1, [0, 1], [1, 0], [1, 1]],
  [4, [-1, 0], [1, 0], [1, 1]],
  [4, [-1, 0], [1, 0], [1, -1]],
  [4, [-1, 0], [0, 1], [0, -1]],
];

// 初期化と盤面の生成
const board = ref<number[][]>(initBoard(10, 20));
// 現在のブロックの状態
const block = ref<BlockStatus>(initBlock());

const boardCells = computed(() => {
  return [...new Array(200)].map((_, i) => {
    let v = board.value[Math.floor(i / 10)][i % 10];
    let edgeColor = v === 0 ? '#888' : `hsl(${((v - 1) / 7) * 360}deg, 100%, 70%)`;
    let bgColor = v === 0 ? '#ccc' : `hsl(${((v - 1) / 7) * 360}deg, 100%, 50%)`;
    return { style: { backgroundColor: bgColor, border: `4px ridge ${edgeColor}` } };
  });
});

//　現在のゲームの状況
const gameOver = ref(false);

/**
 *
 * @param blockStatus
 * @param remove
 * @param action
 */

function putBlock(blockStatus: BlockStatus, remove = false, action = false): boolean {
  let { blockIndex, x, y, rotation } = blockStatus;
  const blockShape = [...blockShapes[blockIndex]];
  const rotateMax = blockShape.shift() as number;
  blockShape.unshift([0, 0]);
  for (let [dy, dx] of blockShape as [number, number][]) {
    for (let i = 0; i < rotation % rotateMax; i++) {
      [dx, dy] = [dy, -dx];
    }
    if (remove) {
      board.value[y + dy][x + dx] = 0;
    } else {
      if (board.value[y + dy][x + dx]) {
        return false;
      }
      if (action) {
        board.value[y + dy][x + dx] = blockIndex;
      }
    }
  }
  if (!action) {
    putBlock(blockStatus, remove, true);
  }
  return true;
}

function move(dx: number, dy: number, dr: number) {
  putBlock(block.value, true);
  if (
    putBlock({
      blockIndex: block.value.blockIndex,
      x: block.value.x + dx,
      y: block.value.y + dy,
      rotation: block.value.rotation + dr,
    })
  ) {
    block.value.x += dx;
    block.value.y += dy;
    block.value.rotation += dr;
    return true;
  } else {
    putBlock(block.value);
    return false;
  }
}

function eraseLine() {
  for (let y = 0; y < 20; y++) {
    let removable = true;
    for (let x = 0; x < 10; x++) {
      if (board.value[y][x] === 0) removable = false;
    }
    if (removable) {
      for (let j = y; j >= -1; j--) {
        for (let x = 0; x < 10; x++) {
          board.value[j][x] = j === -1 ? 0 : board.value[j - 1][x];
        }
        y--;
      }
      emit('attack');
    }
  }
}

watch(
  () => props.gameStart,
  () => {
    if (props.gameStart) {
      board.value = initBoard(10, 20);
      timerId.value = setInterval(() => {
        // 自由落下させる
        if (!move(0, 1, 0)) {
          block.value = initBlock();
          eraseLine();
          if (!putBlock(block.value)) {
            gameOver.value = true;
            clearInterval(timerId.value);
            emit('gameOver');
          }
        }
      }, 500);

      onKeyDown.value = (event: { key: string }) => {
        if (event.key === props.keyConfig.controls.moveLeft && move(-1, 0, 0)) {
        } else if (event.key === props.keyConfig.controls.moveRight && move(1, 0, 0)) {
        } else if (event.key === props.keyConfig.controls.rotation && move(0, 0, 1)) {
        } else if (event.key === props.keyConfig.controls.moveDown && move(0, 1, 0)) {
        }
      };

      document.addEventListener('keydown', onKeyDown.value);
    }
  },
);

watch(
  () => props.gameEnd,
  () => {
    if (props.gameEnd) {
      if (onKeyDown.value) document.removeEventListener('keydown', onKeyDown.value);
      clearInterval(timerId.value);
    }
  },
);
</script>

<style></style>
