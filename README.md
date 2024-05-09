# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur
- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

## プロジェクトの概要

このプロジェクトは、Vue 3とTypeScriptを使用して開発されたテトリスゲームです。ユニークな点は、二つのテトリス盤面を同時に操作し、対戦形式で敵を倒すことが目的とされています。対戦相手を倒すことにより、スコアを獲得し、ゲームの進行が可能になります。

## システムの概要

### コンポーネント設計

本アプリケーションのコンポーネント設計は、再利用性とメンテナンスの容易さを考慮して、アトミックデザインを採用しています。これにより、小さなUIパーツからページ全体に至るまで、システマティックにコンポーネントを管理しやすくなっています。

### 使用ライブラリ

- **Vue 3:** インタラクティブなユーザーインターフェースを構築するためのフレームワーク。
- **Tailwind CSS:** 効率的なスタイリングを実現するためのユーティリティファーストのCSSフレームワーク。
- **vue-tsc:** `.vue`ファイル内でのTypeScriptの型チェックを行うために使用します。

## 開発環境のセットアップ

プロジェクトのローカルでの開発を開始するには、以下の手順を実行してください。

1. 依存関係のインストール:
   ```bash
   pnpm install
   ```
2. 開発環境の立ち上げ:
   ```bash
    pnpm run dev
   ```
