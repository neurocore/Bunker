<template>
  <div v-if="state.is_player()" class="screen">
    <div class="block">
      <div class="title">{{ state.name }}</div>
    </div>
    <div class="block">
      <div>Game with id = "{{ state.game_id }}"</div>
    </div>
    
    <div class="container">
      <Card code="code" type="none">Просто</Card>
      <Card code="code" type="type">Я карта</Card>
      <Card code="code" type="type">Я карта</Card>
    </div>
  </div>
  <div v-else class="screen">
    Комната не найдена
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Card from '../elements/card.vue';
  
  export default defineComponent({
    name: 'Game',
    props: {
      game_id: Number
    },
    inject: ['game', 'state'],
    components: {
      Card
    },

    mounted: function()
    {
      console.log('state', this.state);
      if (this.state.is_host())
      {
        const n = this.state.players_n();
        this.game.init(n);
        this.game.execute_next();
      }
    },
  });
</script>
