import { nanoid } from 'nanoid';
import { reactive } from 'vue';
import * as Ably from 'ably';

export const state = reactive(
{
  phase: 'home',
  name: '',
  game_id: null,
  client_id: null,
  channel: null,
  players: {},
  deck: [],

  is_host()
  {
    return this.client_id == this.game_id;
  },

  is_player()
  {
    console.log('this.game_id', this.game_id, typeof(this.game_id));
    return this.game_id && this.game_id != '';
  },

  set_cid(val)
  {
    this.client_id = val;
  },

  set_name(name)
  {
    this.name = name;

    if (this.channel)
      this.channel.presence.updateClient(this.client_id, {name});
  },

  connect(game_id)
  {
    const key = process.env.VUE_APP_API_KEY;
    const pre = process.env.VUE_APP_PRE;
    this.game_id = game_id;

    if (!this.client_id)
    {
      this.client_id = sessionStorage.getItem(`${pre}_cid`)
                    || nanoid(16);
    }
    sessionStorage.setItem(`${pre}_cid`, this.client_id);

    if (this.channel || !this.game_id) return false;

    const ch_name = `cbl_bunker_${this.game_id}`;
    const realtime = new Ably.Realtime({ key });
    this.channel = realtime.channels.get(ch_name);
    const presence = this.channel.presence;

    if (this.is_host()) // Host
    {
      presence.subscribe(e =>
      {
        console.log(`Client ${e.clientId} is ${e.action}`);

        if (e.action == 'present'
        ||  e.action == 'enter'
        ||  e.action == 'update')
        {
          console.log(e.data);
          if ('name' in e.data)
            this.players[e.clientId] = { name: e.data.name };
          this.update_presence();
        }

        if (e.action == 'leave')
        {
          if (e.clientId in this.players)
          {
            delete this.players[e.clientId];
            this.update_presence();
          }
        }
      });
    }

    this.channel.subscribe(e =>
    {
      console.log(`Action ${e.name} with`, e.data);
      switch(e.name)
      {
        case 'players':
        {
          if (!this.is_host())
            this.players = e.data;
          break;
        }

        case 'start_game':
        {
          this.phase = 'game';
          break;
        }
      }
    });

    return true;
  },

  disconnect()
  {
    this.channel.detach();
  },

  update_presence()
  {
    this.channel.publish('players', this.players);
  },

  start_game()
  {
    this.channel.publish('start_game', {});
  },
});
