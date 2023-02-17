import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
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
    { path: '/game/', component: Game },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ],
});

const app = createApp(App);
app.use(router);

app.mount('#app');
