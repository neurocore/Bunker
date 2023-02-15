import * as Ably from 'ably';
import { reactive } from 'vue';
import { nanoid } from 'nanoid';

export const state = reactive(
{
  name: '',
  host: false,
  game_id: null,
  client_id: nanoid(16),
  channel: null,
  players: {},
  deck: [],

  set_host(val)
  {
    this.host = val;
  },

  set_name(name)
  {
    this.name = name;

    if (this.channel)
      this.channel.presence.updateClient(this.client_id, {name});
  },

  start_game()
  {
    // emit event about game start here (catch in lobby -> push)
  },

  connect(game_id)
  {
    this.game_id = game_id;

    console.log(process.env.NODE_ENV);
    const key = process.env.VUE_APP_API_KEY;

    if (this.channel || !this.game_id) return false;

    const realtime = new Ably.Realtime({ key });
    this.channel = realtime.channels.get(`cbl_bunker_${this.game_id}`);

    if (this.host) // Host
    {
      this.channel.subscribe(msg =>
      {
        console.log("Received message:", msg.data);
      });
    }

    // this.channel.publish("move", { player: "player1" });

    const presence = this.channel.presence;

    presence.subscribe(e =>
    {
      console.log(`Client ${e.clientId} is ${e.action}`);
      console.log('data', e.data || {});

      if (e.action == 'present'
      ||  e.action == 'enter'
      ||  e.action == 'update')
      {
        console.log(e.data);
        this.players[e.clientId] =
        {
          name: e.data.name
        }
      }

      if (e.action == 'leave')
      {
        if (e.clientId in this.players)
          delete this.players[e.clientId];
      }
    });

    presence.enterClient(this.client_id, {name: this.name});
    return true;
  },
});
