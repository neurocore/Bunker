import * as Ably from 'ably';

type Action = string;
type Callback = (...args: any[]) => void;

export default class MessagingAbly
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

  _call(action: Action, ...args: any[])
  {
    if (action in this.callbacks)
      this.callbacks[action].forEach(cb => cb(...args))
  }

  establish(game_id: number | string, host: boolean)
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

    if (host) // Host
    {
      presence.subscribe((e: any) =>
      {
        console.log(`Client ${e.clientId} is ${e.action}`);

        if (e.action == 'present'
        ||  e.action == 'enter'
        ||  e.action == 'update')
        {
          this._call('enter', e.clientId, e.data.name);
        }

        if (e.action == 'leave')
        {
          this._call('leave', e.clientId);
        }
      });
    }

    this.channel.subscribe((e: any) =>
    {
      console.log(`Action ${e.name} with`, e.data);
      this._call(e.name, e.data);
    });

    return true;
  }

  revoke()
  {
    this.channel.detach();
  }

  update_presence(players: Record<string, any>)
  {
    this.channel.publish('players', players);
  }

  update_name(cid: string, name: string)
  {
    if (this.channel)
      this.channel.presence.updateClient(cid, {name});
  }

  start_game()
  {
    this.channel.publish('start_game', {});
  }
}
