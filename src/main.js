import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { state } from './state.js';
import { game } from './domain/game.js';
import Home from './components/screens/home.vue';
import Lobby from './components/screens/lobby.vue';
import Game from './components/screens/game.vue';
import NotFound from './components/screens/404.vue';
import App from './App.vue';

const router = createRouter(
{
  history: createWebHistory(),
  routes:
  [
    { path: '/', component: Home },
    { path: '/lobby/:game_id', component: Lobby, props: true },
    { path: '/game/:game_id', component: Game, props: true },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});

const app = createApp(App);
app.use(router);
app.provide('state', state);
app.provide('game', game);

app.mount('#app');
