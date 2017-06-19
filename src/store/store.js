import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/*
 Tem váriaveis para utilizar globalmente na aplicaçao
 */

export const store = new Vuex.Store({
  state: {
    user: null, // default é null
  },
  // Getter para ter data binding
  getters: {
    auth: state => {
      return state.user;
    }
  },
  // Mutaçoes (Setters)
  mutations: {
    login: (state,userObj) => {
      state.user = userObj;
    },
    logout: state => {
      state.user = false;
    }
  },
  action: {
    verificarUser: context => {
      this.$http.get('me').then(res => {
        // success
        console.log(res.body);
      }, res => {
        // error
        console.log(res.status);

      })
    }
  }
});

