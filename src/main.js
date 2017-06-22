import { routes } from './router'
import ElementUi from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt';
import VueProgressBar from 'vue-progressbar';
import SocialSharing from 'vue-social-sharing';

import Vue from 'vue'
window.Vue = Vue
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'

import {store} from './store/store';
import Autenticacao from './custom/autenticacao';

// Dependencies vendor
Vue.use(VueResource);
Vue.use(ElementUi,{locale});
Vue.use(VueProgressBar, {
  color: 'rgb(179,193,78)',
  failedColor: 'black',
  height: '2px'
});
Vue.use(SocialSharing);

// Http
Vue.http.options.root = 'http://slimapp/api';
Vue.http.options.headers = 'Content-type: application/json';

Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});


// Routes
Vue.use(VueRouter);
const router = new VueRouter({
  routes
})

// Verificar scopes, se user esta loggado ou nao
// Cometer na store
router.beforeEach((to,from,next)=>{
  Autenticacao.autenticar();
  next();
}).bind(Vue);


// instanciar Vue
new Vue({
  el: '#app',
  store, // store:store
  router, // router : router
  render: h => h(App)
})

