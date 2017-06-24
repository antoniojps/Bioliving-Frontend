<template>
  <!-- TODO Mostrar so se tiver colaboradores no resultado -->
  <div class="colaboradores" v-if="this.colaboradores">
  <el-row :gutter="12">
    <h2>Colaboradores</h2>
    <event-colaborador v-for="(colaborador,index) in colaboradores"
                       :titulo="colaborador.nome"
                       :descricao="colaborador.descricao"
                       :srcPic="colaborador.image_src"
                       :key="index"
    >
    </event-colaborador>
  </el-row>
  </div>
</template>

<script>
  import EventColaborador from './EventColaborador.vue';


  export default {

    props:['idEvento'],

    components: {
      'event-colaborador': EventColaborador
    },

    mounted(){
      this.$http.get(`eventos/${this.idEvento}/colaboradores`).then(resposta=>{
        // success
        return resposta.json();
        // error
      },resposta=>{
        return false;
      }).then(data=>{
        this.colaboradores = data.data;
      })
    },

    data(){
      return {
        ajaxFeito : false,
        colaboradores: false,
      }
    }
  }

</script>

<style lang="scss">
  @import '../../../assets/scss/styles.scss';

  .colaboradores {

    h3{
      color:$colorBase2;
    }

    padding:{
      bottom:$spacingBase;
      top:$spacingLarge;
    }
  }

</style>