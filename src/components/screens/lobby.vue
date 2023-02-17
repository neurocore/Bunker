<template>
  <div class="screen screen-main">
    <div class="caption big">Bunker</div>
    
    <div class="block">
      <div>Lobby for game with id = {{ game_id }}</div>
      <div>I am a client with id = {{ state.client_id }}</div>
    </div>

    <div class="block">
      <enter-name @changed-name="change_name"
                  :value="state.name"></enter-name>
    </div>

    <div class="block">
      <div>Players count {{ players_count }}</div>
      <ul>
        <li v-for="player in state.players"
           :key="player.clientId">{{ player.name }}</li>
      </ul>
    </div>

    <div class="block" v-if="state.is_host()">
      <div @click="start_game" class="btn">Начать игру</div>
    </div>
  </div>
</template>

<script>
  import { state } from '../../state.js';
  import EnterName from '../elements/enter_name.vue';
  import { debounce } from 'debounce';

  export default {
    name: 'Lobby',
    props: ['game_id'],
    components: {
      EnterName
    },
    
    data() {
      return {
        state
      }
    },

    watch: {
      'state.phase'(newValue, oldValue) {
        console.log(`Phase: ${oldValue} -> ${newValue}`)
        if (newValue == 'game')
          this.$router.push(`/game`);
      }
    },

    mounted: function() {
      this.state.connect(this.game_id);
    },

    unmounted: function() {
      this.state.disconnect();
    },

    methods: {
      start_game() {
        this.state.start_game();
      }
    },

    created()
    {
      // to not make conflicts with
      // other debounce instances
      this.change_name = debounce(name => {
        console.log('name', name);
        this.state.set_name(name);
      }, 500);
    },

    computed:
    {
      players_count()
      {
        return !state.players ? 0
             : Object.keys(state.players).length;
      }
    }
  }
</script>
