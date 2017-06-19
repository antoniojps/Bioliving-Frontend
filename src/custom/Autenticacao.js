import {store} from './../store/store';

export default class Autenticacao {
  /*
  Método para validar se o utilizador tem tokens validos e obter o id e scopes do mesmo
  Guarda a resposta numa variavel global (na store do Vuex)
   */
  static autenticar(){
    Vue.http.get('me').then(resposta=>{
      // 200 -> login feito
      return resposta.json()
    }, resposta => {
      // 401
      return false;
    }).then((data)=>{
      // Se user esta logado guardar informaçao na store, caso contrario guardar false
      data ? store.commit('login',data) : store.commit('logout');
      console.log('/me request:')
      console.log(store.getters.auth);
      console.log('-----')
    })
  }

}
