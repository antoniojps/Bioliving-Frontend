<template>
  <div class="certificado paddingVertLarge">
    <div class="certificado--lft">
      <i class="fa fa-certificate" aria-hidden="true"></i>
    </div>
    <div class="certificado--rgt">
      <router-link :to="eventoLink" target="_blank"><h3>{{evento.nome_evento}}</h3></router-link>
      <p>{{evento.descricao_short}}</p>
      <router-link :to="certificadoLink" target="_blank">Ver certificado</router-link>

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
      certificadoLink(){
        return `../certificados/${this.evento.eventos_id_eventos}`;
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/styles.scss';

  .certificado {
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
      color: $colorVerde;
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

