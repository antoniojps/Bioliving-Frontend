<template>
  <div class="interesse paddingVertLarge">
      <div class="interesse--lft">
        <i class="fa fa-heart coracaoVermelho" title="Retirar Interesse" @click="retirarInteresse"></i>
      </div>
      <div class="interesse--rgt">
        <h3>{{evento.nome_evento}}</h3>
        <p>{{evento.descricao_short}}</p>

        <router-link :to="eventoLink" target="_blank">Ver evento</router-link>
      </div>
  </div>
</template>

<script>
  import queryString from 'query-string';

  export default {
    props:['evento','idUtilizador'],
    data(){
      return {

      }
    },
    methods:{
      retirarInteresse(){
        this.$Progress.start()
        this.$http.delete(`eventos/${this.evento.eventos_id_eventos}/interesses/${this.idUtilizador}`).then(resposta => {
          // 200 OK
          return resposta.json()
        }, resposta => {
          // erro
          this.$Progress.fail()
          return false;
        }).then((data) => {
          // dados
          this.$emit('removido');
          this.$Progress.finish();
        })
      }
    },
    computed:{
      eventoLink(){
        return `../evento/${this.evento.eventos_id_eventos}`;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .interesse{
    width:100%;
    display:flex;
    align-items: flex-start;
    border:{
      bottom:$borderSize $colorBase7 solid;
    }
    &--lft{
      font-size:$sizeLarge;
      display:flex;
      justify-content: center;
      width:10%;
    }
    &--rgt{
      width:90%;
    }
    i {
      color:$colorVermelho;
      padding:$spacingBase;
      cursor:pointer;
      transition: all .2s ease-in-out;
      &:hover{
        transform: scale(1.1);
        color:$colorBase7;
        &:after{
          position:absolute;
          color:$colorBase;
          font-size:$sizeMedium;
          left:50%;
          font-family: $font;
          transform:translateX(-50%);
          content:'x';
        }
      }
    }
  }
</style>

