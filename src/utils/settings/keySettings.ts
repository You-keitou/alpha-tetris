import type { PlayerKeysConfig } from '../../types/settings/keySettings';

export const keysConfig: PlayerKeysConfig[] = JSON.parse(
  localStorage.getItem('keysConfig') as string,
) ?? [
  {
    playerNumber: 1,
    controls: {
      rotation: 'w',
      moveLeft: 'a',
      moveDown: 's',
      moveRight: 'd',
    },
  },
  {
    playerNumber: 2,
    controls: {
      rotation: 'ArrowUp',
      moveLeft: 'ArrowLeft',
      moveDown: 'ArrowDown',
      moveRight: 'ArrowRight',
    },
  },
];
