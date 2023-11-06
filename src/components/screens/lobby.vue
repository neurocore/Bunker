<template>
  <div class="screen screen-main">
    <div class="caption big">Bunker</div>
    
    <div class="block">
      <div>Lobby for game with id = {{ game_id }}</div>
      <div>I am a client with id = {{ this.store.client_id }}</div>
    </div>

    <div class="block">
      <enter-name @changed-name="change_name"
                  :value="this.store.name"></enter-name>
    </div>

    <div class="block">
      <div>Players count {{ this.store.players_n }}</div>
      <ul>
        <li v-for="player in this.store.get_players"
           :key="player.clientId">{{ player.name }}</li>
      </ul>
    </div>

    <div class="block" v-if="this.store.is_host">
      <div @click="start_game" class="btn">Начать игру</div>
    </div>
  </div>
</template>

<script lang="ts">
  import * as gs from '../../service/game_server.js';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { clientStore } from '../../store/client.js';
  import EnterName from '../elements/enter_name.vue';
  import { debounce } from 'debounce';

  export default defineComponent({
    name: 'Lobby',
    props: ['game_id'],
    components: {
      EnterName
    },
    setup() {
      const router = useRouter();
      const store = clientStore();

      return { router, store };
    },

    watch: {
      'store.phase'(newValue, oldValue) {
        console.log(`Phase: ${oldValue} -> ${newValue}`)
        if (newValue == 'game')
          this.router.push(`/game/${this.game_id}`);
      }
    },

    mounted: function() {
      this.store.establish(this.game_id);

      gs.subscribe('players', data =>
      {
        console.log('players dry', data, this);
        this.store.set_players(data);
      });

      gs.subscribe('start_game', () =>
      {
        this.store.phase = 'game';
      });
    },

    unmounted: function() {
      this.store.revoke();
    },

    methods: {
      start_game() {
        this.store.start_game();
      }
    },

    created()
    {
      // to not make conflicts with
      // other debounce instances
      this.change_name = debounce(name => {
        console.log('name', name);
        this.store.set_name(name);
      }, 500);
    },
  });
</script>
