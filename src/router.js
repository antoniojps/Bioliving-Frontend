import Home from './containers/Home.vue';
import Evento from './containers/Evento.vue';
import Login from './containers/Login.vue';
import Register from './containers/Register.vue';
import Perfil from './containers/Perfil.vue';
import Certificado from './containers/Certificado.vue';
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

  {path: '/home/:query', name:'home', component: Home,props:true},
  {path: '/', component: Home},
  {path: '/evento/:id', component: Evento, props: true},
  {path: '/perfil', component: Perfil},
  {path: '/certificado',component: Certificado},
  {path: '*', component: PageNotFound}
];

export const protectedRoutes = [
  '/perfil'
];



