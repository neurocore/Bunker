import * as Ably from 'ably';
import { type Action, type Callback,
         type GameUpdate, type MessagingBase
       } from './messaging_base.js';

export default class MessagingAbly implements MessagingBase
{
  key: string;
  channel: any;
  callbacks: Record<Action, Callback[]>;

  constructor(key: string)
  {
    this.key = key;
    this.channel = null;
    this.callbacks = {};
  }

  subscribe(action: Action, cb: Callback)
  {
    if (!(action in this.callbacks))
      this.callbacks[action] = [];
    this.callbacks[action].push(cb);
  }

  private call(action: Action, ...args: any[])
  {
    if (action in this.callbacks)
      this.callbacks[action].forEach(cb => cb(...args))
  }

  establish(game_id: string, host: boolean)
  {
    if (this.channel || !game_id) return false;

    const pre = import.meta.env.VITE_APP_PRE;
    const channel_name = `${pre}_${game_id}`;

    const key = this.key;
    let realtime = null;
    try
    {
      realtime = new Ably.Realtime({ key });
    }
    catch (err)
    {
      console.error(err);
      return;
    }

    this.channel = realtime.channels.get(channel_name);
    const presence = this.channel.presence;

    if (host) this.init_host(presence);

    this.channel.subscribe((e: any) =>
    {
      // decide here if it is host-only or client info

      // if (e.name == 'make_move') console.log('do move');

      console.log(`Action ${e.name} with`, e.data);
      this.call(e.name, e.data);
    });

    return true;
  }

  private init_host(presence: any)
  {
    let players: Record<string, any> = {};

    presence.subscribe((e: any) =>
    {
      const cid = e.clientId;
      console.log(`--- Client ${cid} is ${e.action}`);

      if (e.action == 'present'
      ||  e.action == 'enter'
      ||  e.action == 'update')
      {
        console.log('--- enter', e);

        if (!(cid in players)) players[cid] = {};
        Object.assign(players[cid], e.data);
        this.update_presence(players);

        console.log('--- players', players);
      }

      if (e.action == 'leave')
      {
        if (cid in players)
        {
          delete players[cid];
          this.update_presence(players);
        }
      }
    });
  }

  revoke()
  {
    this.channel.detach();
  }

  update_presence(players: Record<string, any>)
  {
    const players_dry = structuredClone(players);

    // Not expose other client's secret keys
    for (const key of Object.keys(players_dry))
      delete players_dry[key]['secret'];

    this.channel.publish('players', players_dry);
  }

  update_data(cid: ClientID, data: any)
  {
    if (this.channel == null) return;
    this.channel.presence.updateClient(cid, data);
  }

  start_game()
  {
    if (this.channel == null) return;
    this.channel.publish('start_game', {});
  }

  update_game(update: GameUpdate)
  {
    if (this.channel == null) return;
    this.channel.publish(
    {
      name: 'game_update',
      data: update,
    });
  }
}
