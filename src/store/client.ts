import { defineStore } from 'pinia';
import * as gs from '../service/game_server.js';
import * as storage from '../service/storage.js';
import { nanoid } from 'nanoid';

export const clientStore = defineStore('client',
{
  state: () => (
  {
    phase: 'home',
    name: '',
    client_id: null as ClientID | null,
    game_id: null as string | null,
    secret: null as string | null,
    channel: null as any,
    players: {} as Record<string, any>,
    cards: {} as Record<string, any>,
  }),

  getters:
  {
    is_host(state: any)
    {
      return state.client_id === state.game_id;
    },

    is_player(state: any)
    {
      return state.game_id !== '';
    },

    players_n(state: any)
    {
      return !state.players ? 0
        : Object.keys(state.players).length;
    },

    get_players(state: any)
    {
      return state.players;
    },
  },

  actions:
  {
    set_cid(val: string)
    {
      this.client_id = val;
    },

    set_name(name: string)
    {
      if (this.client_id == null) return;
      this.name = name;
      gs.update_data(this.client_id, {name});
    },

    set_players(players: Record<string, any>)
    {
      this.players = players;
    },

    establish(game_id: string)
    {
      if (!this.client_id)
        this.client_id = storage.get('cid', nanoid(16));

      storage.set('cid', this.client_id);

      this.secret = nanoid(20);
      this.game_id = game_id;
      if (!gs.establish(game_id)) return false;

      gs.update_data(this.client_id!, {secret: this.secret});

      gs.subscribe('players', (data: any) =>
      {
        console.log('players dry', data, this);
        this.players = data;
      });

      gs.subscribe('start_game', () =>
      {
        this.phase = 'game';
      });

      return true;
    },

    revoke()
    {
      gs.revoke();
    },

    start_game()
    {
      gs.start_game();
    },
  },

  persist: true,
});
