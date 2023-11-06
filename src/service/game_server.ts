import { reactive } from 'vue';
import { io } from 'socket.io-client';
import * as Card from '../domain/card.js';

const url = import.meta.env.NODE_ENV === 'production'
          ? 'undefined' : 'http://localhost:3000';

export const state = reactive({
  connected: false
});


type Action = string;
type Callback = (...args: any[]) => void;

type GameUpdateType = 'open' | 'give';
type GameUpdate = Record<GameUpdateType, [ClientID, Card.Name]>;


const socket = io(url, { autoConnect: false });
const callbacks: { [key: Action]: Callback[] } = {};
const options = { room_id: '' };

socket.on('connect', () => {
  console.log('server connected');
  state.connected = true;

  console.log(options.room_id);

  if (options.room_id.length > 0)
    socket.emit('join', options.room_id);
});

socket.on('disconnect', () => {
  console.log('server disconnected');
  state.connected = false;
});

socket.on('action', (action: Action, ...args: any[]) => {
  console.log('server action', ...args);
  call(action, args);
});

socket.on('message', (...args: any[]) => {
  console.log('server message', ...args);
});



function call(action: Action, ...args: any[])
{
  if (action in callbacks)
    callbacks[action].forEach(cb => cb(...args))
}

export function subscribe(action: Action, cb: Callback)
{
  if (!(action in callbacks))
    callbacks[action] = [];
  callbacks[action].push(cb);
}

export function establish(room_id: string)
{
  console.log('establish', room_id);
  if (!room_id) return false;
  options.room_id = room_id;
  socket.connect(); 
}

export function revoke()
{
  if (!state.connected) return;
  socket.close();
}

export function update_data(cid: ClientID, data: any)
{
  if (!state.connected) return;
  socket.emit('action', {cid, data});
}

export function start_game()
{
  if (!state.connected) return;
  socket.emit('action', 'start_game');
}

export function update_game(update: GameUpdate)
{
  if (!state.connected) return;
  socket.emit('game_update', update);
}
