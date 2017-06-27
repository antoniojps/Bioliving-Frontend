import { routes,protectedRoutes } from './router'
import ElementUi from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt';
import VueProgressBar from 'vue-progressbar';
import SocialSharing from 'vue-social-sharing';
import * as VueGoogleMaps from 'vue2-google-maps';
import infiniteScroll from 'vue-infinite-scroll'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chartjs'

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
Vue.use(infiniteScroll);
Vue.use(VueChartkick, { Chartkick });

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDeycVva7lFs4Eaye6rvXWknNEGguBEMAg'
  }
});

// Http
Vue.http.options.root = 'http://46.101.56.18/api/v1';
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
  Autenticacao.autenticar().then(()=>{
   if(protectedRoutes.includes(to.path)){
     if(store.getters.auth){
       next(to.path);
     } else {
       next('/');
     }
   } else {
      next();
   }
  })
  next();
}).bind(Vue);


// instanciar Vue
new Vue({
  el: '#app',
  store, // store:store
  router, // router : router
  render: h => h(App)
})

