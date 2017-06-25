import Home from './containers/Home.vue';
import Evento from './containers/Evento.vue';
import Login from './containers/Login.vue';
import Register from './containers/Register.vue';
import Perfil from './containers/Perfil.vue';
import PageNotFound from './containers/PageNotFound.vue';


/* TODO: Adicionar e criar outras routes
* $conta
* $conta/pontos
* $conta/eventos
* $conta/eventos/:id
* admin
* ...
* */
export const routes = [
  {path: '/', component: Home},
  {path: '/evento', component: Home},
  {path: '/evento/:id', component: Evento, props: true},
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/perfil', component: Perfil},
  {path: '*', component: PageNotFound}
];



