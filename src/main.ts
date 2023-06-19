import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createRouter, createWebHistory } from 'vue-router';
import GameClass from './domain/game.js';
import Home from './components/screens/home.vue';
import Lobby from './components/screens/lobby.vue';
import Game from './components/screens/game.vue';
import NotFound from './components/screens/404.vue';
import App from './App.vue';

const router = createRouter(
{
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lobby/:game_id', component: Lobby, props: true },
    { path: '/game/:game_id', component: Game, props: true },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ]
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.provide('game', new GameClass());

app.mount('#app');
