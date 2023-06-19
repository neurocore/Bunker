<template>
  <div v-if="this.store.is_player" class="screen">
    <div class="block">
      <div class="title">{{ this.store.name }}</div>
    </div>
    <div class="block">
      <div>Game with id = "{{ this.store.game_id }}"</div>
    </div>
    
    <div class="container">
      <Card code="code" type="none">Просто</Card>
      <Card code="code" type="type">Я карта</Card>
      <Card code="code" type="type">Я карта</Card>
    </div>
  </div>
  <div v-else class="screen">
    <div>Game with id = "{{ game_id }}"</div>
    Комната не найдена
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { clientStore } from '../../store/client.js';
  import Card from '../elements/card.vue';
  
  export default defineComponent({
    name: 'Game',
    props: {
      game_id: String
    },
    inject: ['game'],
    components: {
      Card
    },
    setup() {
      const store = clientStore();

      return {
        store,
      };
    },

    mounted: function()
    {
      console.log('store', this.store);
      if (this.store.is_host)
      {
        const n = this.store.players_n;
        this.game.init(n);
        this.game.execute_next();
      }
    },
  });
</script>
