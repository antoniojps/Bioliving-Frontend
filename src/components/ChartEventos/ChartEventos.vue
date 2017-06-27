<template>
  <div>
    <column-chart :discrete="true" :data="dados" :libary="options" :colors="['#B3C14E']" ytitle="Número de utilizadores" xtitle="Dia"></column-chart>
  </div>
</template>

<script>
  export default {

    mounted(){
      this.$http.get('grafico').then(
        resposta => {
          // Ok

          return resposta.json();
        }, resposta => {
          // Erro

        }).then(data => {
        this.dados = data;
      })
    },

    data(){
      return {
        dados : [],
        options: {

        }
      }
    }
  }

</script>

<style lang="scss">

</style>

