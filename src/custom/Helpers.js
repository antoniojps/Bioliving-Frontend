/*
 Contem funções utilizadas repetidamente no projeto
 */

export default class Helper {

  // Remove keys com valores undefined, nulos ou strings vazias
  static limparObj(obj){
    Object.keys(obj).forEach(key => (obj[key] === undefined || obj[key] === '' || obj[key] === null) && delete obj[key]);
  }

}