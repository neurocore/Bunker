import { reactive } from 'vue';
import { messaging } from './service/messaging.js';
import * as storage from './service/storage.js';
import { nanoid } from 'nanoid';

const state = reactive(
{
  phase: 'home',
  name: '',
  client_id: null as string | null,
  game_id: null as string | null,
  channel: null as any,
  players: {} as Record<string, any>,
  cards: {} as Record<string, any>,

  is_host()
  {
    return this.client_id == this.game_id;
  },

  is_player()
  {
    return this.game_id && this.game_id != '';
  },

  players_n()
  {
    return !this.players ? 0
      : Object.keys(this.players).length;
  },

  set_cid(val: string)
  {
    this.client_id = val;
  },

  set_name(name: string)
  {
    this.name = name;
    messaging.update_name(this.client_id, name);
  },

  establish(game_id: string)
  {
    if (!this.client_id)
    {
      this.client_id = storage.get('cid', nanoid(16));
    }
    storage.set('cid', this.client_id);

    this.game_id = game_id;
    return messaging.establish(game_id, this.is_host());
  },

  revoke()
  {
    messaging.revoke();
  },

  update_presence()
  {
    messaging.update_presence(this.players);
  },

  start_game()
  {
    messaging.start_game();
  },
});

messaging.subscribe('enter', (cid, name) =>
{
  if (!name) return;
  state.players[cid] = { name };
  state.update_presence();
});

messaging.subscribe('leave', cid =>
{
  if (cid in state.players)
  {
    delete state.players[cid];
    state.update_presence();
  }
})

messaging.subscribe('players', data =>
{
  console.log('players', data);

  if (!state.is_host())
    state.players = data;
});

messaging.subscribe('start_game', () =>
{
  state.phase = 'game';
});

export { state };
