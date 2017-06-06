import { routes } from './router'
import ElementUi from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt';
import VueProgressBar from 'vue-progressbar';

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'


// Dependencies vendor
Vue.use(ElementUi,{locale});
Vue.use(VueProgressBar, {
  color: 'rgb(255,255,255)',
  failedColor: 'black',
  height: '2px'
});

// Routes
Vue.use(VueRouter);
const router = new VueRouter({
  routes
})

// instanciar Vue
new Vue({
  el: '#app',
  router, // router : router
  render: h => h(App)
})
