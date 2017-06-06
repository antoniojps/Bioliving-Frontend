import Home from './containers/Home.vue';
import Evento from './containers/Evento.vue';
import Login from './containers/Login.vue';
import Register from './containers/Register.vue';
import PageNotFound from './containers/PageNotFound.vue';

export const routes = [
  {path: '/', component: Home},
  {path: '/evento', component: Home},
  {path: '/evento/:id', component: Evento, props: true},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '*', component: PageNotFound}
];



