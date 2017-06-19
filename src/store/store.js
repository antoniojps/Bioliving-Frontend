import Vue from 'vue';
import Vuex from 'vuex';
import Autenticacao from './../custom/autenticacao';
Vue.use(Vuex);

/*
 Tem váriaveis para utilizar globalmente na aplicaçao

  Depois para fazer render de componentes seletivamente de acordo com o scope basta meter na propriedade computed:
 ...mapGetters([
 'auth',
 'idUtilizador',
 'publicoScope',
 'normalScope',
 'socioScope',
 'colaboradorScope',
 'adminScope'
 ])

 e user v-if="publicoScope"

 */

export const store = new Vuex.Store({
  state: {
    user: null, // default é null
  },
  // Getter para ter data binding
  getters: {
    idUtilizador: state => {
      return state.user ? state.user.id : false;
    },
    publicoScope: state => {
      return state.user ? state.user.scope.includes('publico') : false;
    },
    normalScope: state => {
      return state.user ? state.user.scope.includes('normal') : false;
    },
    socioScope: state => {
      return state.user ? state.user.scope.includes('socio') : false;
    },
    colaboradorScope: state => {
      return state.user ? state.user.scope.includes('colaborador') : false;
    },
    adminScope: state => {
      return state.user ? state.user.scope.includes('admin') : false;
    },
    auth: state => {
      return state.user;
    },
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

