import * as Ably from 'ably';

export default class MessagingAbly
{
  constructor(key)
  {
    this.key = key;
    this.channel = null;
    this.callbacks = {}; // {action: [cbs]}
  }

  subscribe(action, cb)
  {
    if (!(action in this.callbacks))
      this.callbacks[action] = [];
    this.callbacks[action].push(cb);
  }

  _call(action, ...args)
  {
    if (action in this.callbacks)
      this.callbacks[action].forEach(cb => cb(...args))
  }

  establish(game_id, host)
  {
    if (this.channel || !game_id) return false;

    const pre = process.env.VUE_APP_PRE;
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
      presence.subscribe(e =>
      {
        console.log(`Client ${e.clientId} is ${e.action}`);

        if (e.action == 'present'
        ||  e.action == 'enter'
        ||  e.action == 'update')
        {
          console.log(e.data);

          this._call('enter', e.clientId, e.data.name);
        }

        if (e.action == 'leave')
        {
          this._call('leave', e.clientId);
        }
      });
    }

    this.channel.subscribe(e =>
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

  update_presence(players)
  {
    this.channel.publish('players', players);
  }

  update_name(cid, name)
  {
    if (this.channel)
      this.channel.presence.updateClient(cid, {name});
  }
}
