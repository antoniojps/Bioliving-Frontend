<template>
  <div class="inscricao paddingVertLarge">
    <div class="inscricao--lft">
      <i class="fa fa-pencil" aria-hidden="true"></i>
    </div>
    <div class="inscricao--rgt">
      <router-link :to="eventoLink" target="_blank"><h3>{{evento.nome_evento}}</h3></router-link>
      <p>{{evento.descricao_short}}</p>
      <router-link :to="eventoLink" target="_blank">Ver evento</router-link>

    </div>
  </div>
</template>

<script>

  export default {
    props: ['evento', 'idUtilizador', 'icon'],
    data(){
      return {}
    },
    methods: {},
    computed: {
      eventoLink(){
        return `../evento/${this.evento.eventos_id_eventos}`;
      },
      inscricaoLink(){
        return `../inscricaos/${this.evento.eventos_id_eventos}`;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .inscricao {
    width: 100%;
    display: flex;
    align-items: flex-start;
    border: {
      bottom: $borderSize $colorBase7 solid;
    }
    &--lft {
      font-size: $sizeLarge;
      display: flex;
      justify-content: center;
      width: 10%;
    }
    &--rgt {
      width: 90%;
    }
    i {
      color: $colorAzul;
      padding: $spacingBase;
      cursor: pointer;
      transition: all .2s ease-in-out;
      &:hover {
        transform: scale(1.1);
        color: $colorVerde3;
      }
    }

  }

</style>

