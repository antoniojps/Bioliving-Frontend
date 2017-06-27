import Home from './containers/Home.vue';
import Evento from './containers/Evento.vue';
import Login from './containers/Login.vue';
import Register from './containers/Register.vue';
import Perfil from './containers/Perfil.vue';
import Certificado from './containers/Certificado.vue';
import CriarEvento from './containers/CriarEvento.vue';
import PageNotFound from './containers/PageNotFound.vue';
import Gestao from './containers/Gestao.vue';


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
  {path: '/criar-evento', component: CriarEvento},
  {path: '/certificado',component: Certificado},
  {path: '/gestao',component: Gestao},
  {path: '*', component: PageNotFound}
];

export const protectedRoutes = [
  '/perfil',
  '/criar-evento',
  '/gestao'
];



