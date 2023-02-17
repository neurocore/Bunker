<template>
  <div class="screen screen-main">
    <div class="caption big">Bunker</div>
    <div class="settings">
      <div class="caption">Настройки</div>

    </div>
    <div @click="create_host" class="btn create_host">Создать хост</div>
    <br />
    <slot></slot>
  </div>
</template>

<script>
  import { state } from '../../state.js';
  import { nanoid } from 'nanoid';

  export default {
    name: 'App',
    methods:
    {
      create_host() {
        const game_id = nanoid(12);
        state.set_cid(game_id); // host
        this.$router.push(`/lobby/${game_id}`);
      },
    }
  }
</script>

<style scoped>
  .screen-main {
    padding-top: 50px;
  }
</style>
