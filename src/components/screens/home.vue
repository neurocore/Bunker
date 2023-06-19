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

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { clientStore } from '../../store/client.js';
  import { nanoid } from 'nanoid';

  export default defineComponent({
    name: 'App',
    setup() {
      const router = useRouter();
      const store = clientStore();

      const create_host = () =>
      {
        const game_id = nanoid(12);
        store.set_cid(game_id); // host
        router.push(`/lobby/${game_id}`);
      };

      return {
        create_host,
      };
    },
  });
</script>

<style scoped>
  .screen-main {
    padding-top: 50px;
  }
</style>
